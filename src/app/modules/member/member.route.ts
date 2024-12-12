import express from 'express';
import { MemberControllers } from './member.controller';

const router = express.Router();

router.get('/', MemberControllers.getAllMembers);
router.get('/:memberId', MemberControllers.getSingleMember);
router.delete('/:memberId', MemberControllers.deleteMember);
router.patch('/:memberId', MemberControllers.updateMember);

export const MemberRoute = router;
