import unittest
from syntax import sample
from syntax import sample2
from syntax import email
from syntax import tax_function

class TestSyntax(unittest.TestCase):
    def test_syn(self):
        #test if sample returns 'hello'
        self.assertEqual(sample(), 'hello')
        self.assertEqual(sample2('shane'), 'hello shane')

class TestEmail(unittest.TestCase):
    def test_email(self):
        #test email function
        self.assertEqual(email('shane', 'mcguire'), 'shane.mcguire@evolveu.ca')
        self.assertEqual(email(112,4124), '112.4124@evolveu.ca')

class TestTax(unittest.TestCase):
    def test_tax(self):
        '''test tax function''' 
        self.assertEqual(tax_function(100),'result: $15.0, tax: 15.0%')
        self.assertEqual(tax_function(81444),'result: $14076.87, tax: 17.0%')
        self.assertEqual(tax_function(1120142),'result: $348943.43, tax: 31.0%')
        self.assertEqual(tax_function(198141), 'result: $45172.46, tax: 23.0%')
