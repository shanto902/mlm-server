import express from 'express';
import { CustomerControllers } from './customer.controller';

const router = express.Router();

router.get('/', CustomerControllers.getAllCustomers);
router.get('/:customerId', CustomerControllers.getSingleCustomer);
router.delete('/:customerId', CustomerControllers.deleteCustomer);
router.patch('/:customerId', CustomerControllers.updateCustomer);

export const CustomerRoute = router;
