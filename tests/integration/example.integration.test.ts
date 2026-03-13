import { createInquiry } from '@/lib/actions';

describe('Inquiry Integration', () => {
    it('creates an inquiry successfully', async () => {
        const response = await createInquiry({ name: 'John Doe', message: 'Test message' });
        expect(response).toEqual(expect.objectContaining({ success: true }));
    });
});