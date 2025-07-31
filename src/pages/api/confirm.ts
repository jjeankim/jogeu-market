import type { NextApiRequest, NextApiResponse } from 'next';

interface PaymentData {
  paymentKey: string;
  orderId: string;
  amount: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { paymentKey, orderId, amount }: PaymentData = req.body;

    if (!paymentKey || !orderId || !amount) {
      return res.status(400).json({ 
        message: '필수 파라미터가 누락되었습니다.',
        code: 'INVALID_PARAMETER'
      });
    }

    // 테스트 환경에서는 결제 승인을 시뮬레이션
    // 실제 운영 환경에서는 토스페이먼츠 API를 호출해야 합니다
    const mockPaymentResult = {
      paymentKey,
      orderId,
      amount: parseInt(amount),
      status: 'DONE',
      approvedAt: new Date().toISOString(),
      method: '카드',
      card: {
        company: '테스트카드',
        number: '1234-****-****-1234'
      }
    };

    // 성공 응답
    return res.status(200).json({
      message: '결제가 성공적으로 완료되었습니다.',
      data: mockPaymentResult
    });

  } catch (error) {
    console.error('결제 승인 중 오류:', error);
    return res.status(500).json({
      message: '서버 오류가 발생했습니다.',
      code: 'SERVER_ERROR'
    });
  }
} 