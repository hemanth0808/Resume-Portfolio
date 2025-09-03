#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Hemanth Challa Portfolio Website
Tests all backend functionality including contact form, rate limiting, and database integration.
"""

import asyncio
import aiohttp
import json
import time
from datetime import datetime
from typing import Dict, Any, List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://profile-fusion-2.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.contact_ids = []  # Store created contact IDs for cleanup
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    def log_test(self, test_name: str, success: bool, details: str = ""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat()
        })
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
    
    async def test_api_health_check(self):
        """Test GET /api/ endpoint for basic health check"""
        try:
            async with self.session.get(f"{API_BASE_URL}/") as response:
                if response.status == 200:
                    data = await response.json()
                    expected_message = "Hemanth Challa Portfolio API - Ready!"
                    if data.get("message") == expected_message:
                        self.log_test("API Health Check", True, f"Response: {data}")
                        return True
                    else:
                        self.log_test("API Health Check", False, f"Unexpected message: {data}")
                        return False
                else:
                    self.log_test("API Health Check", False, f"Status: {response.status}")
                    return False
        except Exception as e:
            self.log_test("API Health Check", False, f"Exception: {str(e)}")
            return False
    
    async def test_contact_form_valid_submission(self):
        """Test valid contact form submission"""
        test_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "message": "Hello Hemanth! I'm interested in discussing a potential project collaboration. Your portfolio looks impressive!"
        }
        
        try:
            async with self.session.post(
                f"{API_BASE_URL}/contact",
                json=test_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    if (data.get("success") is True and 
                        "Thank you for your message" in data.get("message", "") and
                        data.get("id")):
                        self.contact_ids.append(data.get("id"))
                        self.log_test("Valid Contact Form Submission", True, f"Contact ID: {data.get('id')}")
                        return True
                    else:
                        self.log_test("Valid Contact Form Submission", False, f"Unexpected response: {data}")
                        return False
                else:
                    error_text = await response.text()
                    self.log_test("Valid Contact Form Submission", False, f"Status: {response.status}, Error: {error_text}")
                    return False
        except Exception as e:
            self.log_test("Valid Contact Form Submission", False, f"Exception: {str(e)}")
            return False
    
    async def test_contact_form_validation_errors(self):
        """Test contact form validation with invalid data"""
        test_cases = [
            {
                "name": "Missing Email Test",
                "data": {"name": "John Doe", "message": "This is a test message with sufficient length."},
                "expected_error": "email"
            },
            {
                "name": "Invalid Email Format",
                "data": {"name": "Jane Doe", "email": "invalid-email", "message": "This is a test message with sufficient length."},
                "expected_error": "email"
            },
            {
                "name": "Name Too Short",
                "data": {"name": "J", "email": "jane@example.com", "message": "This is a test message with sufficient length."},
                "expected_error": "name"
            },
            {
                "name": "Name Too Long",
                "data": {"name": "J" * 101, "email": "jane@example.com", "message": "This is a test message with sufficient length."},
                "expected_error": "name"
            },
            {
                "name": "Message Too Short",
                "data": {"name": "Jane Doe", "email": "jane@example.com", "message": "Short"},
                "expected_error": "message"
            },
            {
                "name": "Message Too Long",
                "data": {"name": "Jane Doe", "email": "jane@example.com", "message": "A" * 1001},
                "expected_error": "message"
            },
            {
                "name": "Missing Required Fields",
                "data": {},
                "expected_error": "required"
            }
        ]
        
        validation_results = []
        
        for test_case in test_cases:
            try:
                async with self.session.post(
                    f"{API_BASE_URL}/contact",
                    json=test_case["data"],
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 422:  # Validation error
                        error_data = await response.json()
                        validation_results.append(True)
                        self.log_test(f"Validation: {test_case['name']}", True, f"Correctly rejected with 422")
                    else:
                        validation_results.append(False)
                        response_text = await response.text()
                        self.log_test(f"Validation: {test_case['name']}", False, f"Expected 422, got {response.status}: {response_text}")
            except Exception as e:
                validation_results.append(False)
                self.log_test(f"Validation: {test_case['name']}", False, f"Exception: {str(e)}")
        
        all_passed = all(validation_results)
        self.log_test("Contact Form Validation Tests", all_passed, f"Passed {sum(validation_results)}/{len(validation_results)} validation tests")
        return all_passed
    
    async def test_rate_limiting(self):
        """Test rate limiting (max 5 requests per hour per IP)"""
        test_data = {
            "name": "Rate Test User",
            "email": "ratetest@example.com",
            "message": "This is a rate limiting test message with sufficient length for validation."
        }
        
        successful_requests = 0
        rate_limited = False
        
        # Try to make 7 requests to trigger rate limiting
        for i in range(7):
            try:
                async with self.session.post(
                    f"{API_BASE_URL}/contact",
                    json=test_data,
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 200:
                        successful_requests += 1
                        data = await response.json()
                        if data.get("id"):
                            self.contact_ids.append(data.get("id"))
                    elif response.status == 429:
                        rate_limited = True
                        error_data = await response.json()
                        self.log_test("Rate Limiting Triggered", True, f"Request {i+1} correctly rate limited: {error_data}")
                        break
                    else:
                        self.log_test("Rate Limiting Test", False, f"Unexpected status {response.status} on request {i+1}")
                        return False
                        
                # Small delay between requests
                await asyncio.sleep(0.1)
                
            except Exception as e:
                self.log_test("Rate Limiting Test", False, f"Exception on request {i+1}: {str(e)}")
                return False
        
        # Rate limiting should kick in after 5 requests
        if successful_requests <= 5 and rate_limited:
            self.log_test("Rate Limiting Functionality", True, f"Successfully made {successful_requests} requests before rate limiting")
            return True
        else:
            self.log_test("Rate Limiting Functionality", False, f"Made {successful_requests} requests, rate limited: {rate_limited}")
            return False
    
    async def test_admin_contacts_retrieval(self):
        """Test GET /api/admin/contacts endpoint"""
        try:
            async with self.session.get(f"{API_BASE_URL}/admin/contacts") as response:
                if response.status == 200:
                    data = await response.json()
                    if isinstance(data, list):
                        # Check if we have contacts and they have the right structure
                        if len(data) > 0:
                            contact = data[0]
                            required_fields = ['id', 'name', 'email', 'message', 'created_at']
                            if all(field in contact for field in required_fields):
                                self.log_test("Admin Contacts Retrieval", True, f"Retrieved {len(data)} contacts with correct structure")
                                return True
                            else:
                                missing_fields = [field for field in required_fields if field not in contact]
                                self.log_test("Admin Contacts Retrieval", False, f"Missing fields: {missing_fields}")
                                return False
                        else:
                            self.log_test("Admin Contacts Retrieval", True, "Retrieved empty contacts list (valid)")
                            return True
                    else:
                        self.log_test("Admin Contacts Retrieval", False, f"Expected list, got: {type(data)}")
                        return False
                else:
                    error_text = await response.text()
                    self.log_test("Admin Contacts Retrieval", False, f"Status: {response.status}, Error: {error_text}")
                    return False
        except Exception as e:
            self.log_test("Admin Contacts Retrieval", False, f"Exception: {str(e)}")
            return False
    
    async def test_database_integration(self):
        """Test that contact messages are properly saved and retrievable"""
        # First, submit a unique contact message
        unique_message = f"Database integration test message - {datetime.now().isoformat()}"
        test_data = {
            "name": "Database Test User",
            "email": "dbtest@example.com",
            "message": unique_message
        }
        
        contact_id = None
        
        # Submit contact
        try:
            async with self.session.post(
                f"{API_BASE_URL}/contact",
                json=test_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    contact_id = data.get("id")
                    if contact_id:
                        self.contact_ids.append(contact_id)
                    else:
                        self.log_test("Database Integration - Contact Creation", False, "No contact ID returned")
                        return False
                else:
                    self.log_test("Database Integration - Contact Creation", False, f"Failed to create contact: {response.status}")
                    return False
        except Exception as e:
            self.log_test("Database Integration - Contact Creation", False, f"Exception: {str(e)}")
            return False
        
        # Wait a moment for database write
        await asyncio.sleep(1)
        
        # Retrieve contacts and verify our message is there
        try:
            async with self.session.get(f"{API_BASE_URL}/admin/contacts") as response:
                if response.status == 200:
                    contacts = await response.json()
                    # Look for our unique message
                    found_contact = None
                    for contact in contacts:
                        if contact.get("message") == unique_message and contact.get("id") == contact_id:
                            found_contact = contact
                            break
                    
                    if found_contact:
                        # Verify all fields are present and correct
                        if (found_contact.get("name") == test_data["name"] and
                            found_contact.get("email") == test_data["email"] and
                            found_contact.get("created_at") and
                            isinstance(found_contact.get("read"), bool)):
                            self.log_test("Database Integration", True, f"Contact properly saved and retrieved with ID: {contact_id}")
                            return True
                        else:
                            self.log_test("Database Integration", False, f"Contact data mismatch: {found_contact}")
                            return False
                    else:
                        self.log_test("Database Integration", False, f"Contact with ID {contact_id} not found in database")
                        return False
                else:
                    self.log_test("Database Integration", False, f"Failed to retrieve contacts: {response.status}")
                    return False
        except Exception as e:
            self.log_test("Database Integration", False, f"Exception during retrieval: {str(e)}")
            return False
    
    async def test_error_handling(self):
        """Test various error scenarios"""
        error_tests = []
        
        # Test malformed JSON
        try:
            async with self.session.post(
                f"{API_BASE_URL}/contact",
                data="invalid json",
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status in [400, 422]:
                    error_tests.append(True)
                    self.log_test("Error Handling - Malformed JSON", True, f"Correctly handled with status {response.status}")
                else:
                    error_tests.append(False)
                    self.log_test("Error Handling - Malformed JSON", False, f"Unexpected status: {response.status}")
        except Exception as e:
            error_tests.append(False)
            self.log_test("Error Handling - Malformed JSON", False, f"Exception: {str(e)}")
        
        # Test non-existent endpoint
        try:
            async with self.session.get(f"{API_BASE_URL}/nonexistent") as response:
                if response.status == 404:
                    error_tests.append(True)
                    self.log_test("Error Handling - Non-existent Endpoint", True, "Correctly returned 404")
                else:
                    error_tests.append(False)
                    self.log_test("Error Handling - Non-existent Endpoint", False, f"Expected 404, got {response.status}")
        except Exception as e:
            error_tests.append(False)
            self.log_test("Error Handling - Non-existent Endpoint", False, f"Exception: {str(e)}")
        
        all_passed = all(error_tests)
        self.log_test("Error Handling Tests", all_passed, f"Passed {sum(error_tests)}/{len(error_tests)} error handling tests")
        return all_passed
    
    async def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for Hemanth Challa Portfolio")
        print(f"📡 Testing API at: {API_BASE_URL}")
        print("=" * 60)
        
        test_functions = [
            self.test_api_health_check,
            self.test_contact_form_valid_submission,
            self.test_contact_form_validation_errors,
            self.test_rate_limiting,
            self.test_admin_contacts_retrieval,
            self.test_database_integration,
            self.test_error_handling
        ]
        
        results = []
        for test_func in test_functions:
            try:
                result = await test_func()
                results.append(result)
            except Exception as e:
                print(f"❌ CRITICAL ERROR in {test_func.__name__}: {str(e)}")
                results.append(False)
            
            # Small delay between tests
            await asyncio.sleep(0.5)
        
        return results
    
    def print_summary(self, results):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 BACKEND TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(results)
        total = len(results)
        
        print(f"✅ Tests Passed: {passed}/{total}")
        print(f"❌ Tests Failed: {total - passed}/{total}")
        
        if passed == total:
            print("🎉 ALL BACKEND TESTS PASSED!")
        else:
            print("⚠️  Some tests failed - see details above")
        
        print("\n📋 Detailed Results:")
        for result in self.test_results:
            status = "✅" if result['success'] else "❌"
            print(f"{status} {result['test']}")
            if result['details']:
                print(f"   {result['details']}")
        
        if self.contact_ids:
            print(f"\n📝 Created {len(self.contact_ids)} test contacts during testing")
        
        return passed == total

async def main():
    """Main test runner"""
    async with BackendTester() as tester:
        results = await tester.run_all_tests()
        all_passed = tester.print_summary(results)
        
        if all_passed:
            print("\n🎯 Backend API is fully functional!")
            return 0
        else:
            print("\n🔧 Backend API has issues that need attention!")
            return 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    exit(exit_code)