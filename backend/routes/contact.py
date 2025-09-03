from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.responses import JSONResponse
from typing import List, Optional
import logging
from datetime import datetime, timedelta
import asyncio
from collections import defaultdict
import time

from models.contact import ContactMessage, ContactMessageCreate, ContactResponse
from database import get_database

# Rate limiting storage (in production, use Redis)
rate_limit_storage = defaultdict(list)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["contact"])

def check_rate_limit(ip_address: str, max_requests: int = 5, window_hours: int = 1) -> bool:
    """
    Simple rate limiting - max 5 requests per hour per IP
    In production, use Redis for distributed rate limiting
    """
    now = time.time()
    window_start = now - (window_hours * 3600)
    
    # Clean old entries
    rate_limit_storage[ip_address] = [
        timestamp for timestamp in rate_limit_storage[ip_address] 
        if timestamp > window_start
    ]
    
    # Check if under limit
    if len(rate_limit_storage[ip_address]) >= max_requests:
        return False
    
    # Add current request
    rate_limit_storage[ip_address].append(now)
    return True

@router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(
    contact_data: ContactMessageCreate,
    request: Request
):
    """
    Submit contact form message
    """
    try:
        # Get client IP and user agent
        client_ip = request.client.host
        user_agent = request.headers.get("user-agent", "")
        
        # Rate limiting check
        if not check_rate_limit(client_ip):
            raise HTTPException(
                status_code=429,
                detail="Too many requests. Please try again later."
            )
        
        # Create contact message
        contact_message = ContactMessage(
            **contact_data.dict(),
            ip_address=client_ip,
            user_agent=user_agent
        )
        
        # Save to database
        db = get_database()
        contact_dict = contact_message.dict()
        await db.contacts.insert_one(contact_dict)
        
        logger.info(f"New contact message from {contact_data.email} - {contact_data.name}")
        
        return ContactResponse(
            success=True,
            message="Thank you for your message! I'll get back to you soon.",
            id=contact_message.id
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error saving contact message: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Sorry, there was an error sending your message. Please try again."
        )

@router.get("/admin/contacts", response_model=List[ContactMessage])
async def get_contact_messages(
    skip: int = 0,
    limit: int = 50,
    unread_only: bool = False
):
    """
    Get contact messages for admin (basic implementation)
    In production, add proper authentication
    """
    try:
        db = get_database()
        
        # Build query
        query = {}
        if unread_only:
            query["read"] = False
        
        # Get messages with pagination
        cursor = db.contacts.find(query).sort("created_at", -1).skip(skip).limit(limit)
        contacts = await cursor.to_list(length=limit)
        
        # Convert to ContactMessage objects
        contact_messages = [ContactMessage(**contact) for contact in contacts]
        
        return contact_messages
        
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error fetching contact messages"
        )

@router.patch("/admin/contacts/{contact_id}/read")
async def mark_contact_as_read(contact_id: str):
    """
    Mark contact message as read
    """
    try:
        db = get_database()
        
        result = await db.contacts.update_one(
            {"id": contact_id},
            {"$set": {"read": True}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact message not found")
        
        return {"success": True, "message": "Contact marked as read"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error marking contact as read: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error updating contact message"
        )