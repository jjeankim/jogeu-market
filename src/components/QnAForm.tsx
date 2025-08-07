import React from 'react'
import Button from './ui/Button'
import { useState } from 'react'
import { 
    FaUser, 
    FaGift, 
    FaTruck, 
    FaExchangeAlt, 
    FaQuestion,
    FaMapMarkerAlt 
} from 'react-icons/fa'

const QnAForm = () => {

    const [selectedCategory, setSelectedCategory] = useState('회원');
    const [openQuestions, setOpenQuestions] = useState(new Set<string>());

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setOpenQuestions(new Set()); // 카테고리 변경 시 모든 질문 닫기
    }

    const toggleQuestion = (questionId: string) => {
        const newOpen = new Set(openQuestions);
        if (newOpen.has(questionId)) {
            newOpen.delete(questionId);
        } else {
            newOpen.add(questionId);
        }
        setOpenQuestions(newOpen);
    }

    // Q&A 데이터
    const qnaData: Record<string, Array<{category: string, questions: Array<{id: string, question: string, answer: string}>}>> = {
        '회원': [
            {
                category: '회원가입',
                questions: [
                    {
                        id: 'member1',
                        question: '회원 가입 방법은 어떻게 되나요?',
                        answer: '회원 가입 방법은 조그마켓 홈페이지에서 회원 가입 버튼을 클릭하여 가입할 수 있습니다.'
                    },
                    {
                        id: 'member2',
                        question: '회원가입할 때 이메일은 꼭 입력해야 하나요?',
                        answer: '네, 이메일은 주문 내역 확인, 배송 안내, 비밀번호 찾기 등을 위해 필수입니다. 정확한 이메일을 입력해주세요.'
                    },
                    {
                        id: 'member3',
                        question: '아이디를 여러 개 만들 수 있나요?',
                        answer: '한 명의 고객이 여러 개의 아이디를 만드는 것은 제한하고 있습니다. 중복 가입은 제재될 수 있으니 유의해주세요.'
                    },
                    {
                        id: 'member4',
                        question: '사업자로 회원가입하고 싶어요.',
                        answer: '회원가입 시 \'사업자 회원\' 옵션을 선택하시면 사업자 정보를 입력하여 가입할 수 있습니다. 별도의 인증 절차가 있을 수 있습니다.'
                    },
                    {
                        id: 'member5',
                        question: '미성년자도 회원가입이 가능한가요?',
                        answer: '만 14세 이상부터 회원가입이 가능합니다. 미성년자의 경우 법정대리인의 동의가 필요할 수 있습니다.'
                    }
                ]
            },
            {
                category: '로그인',
                questions: [
                    {
                        id: 'login1',
                        question: '간편 로그인은 어떻게 사용하나요?',
                        answer: '카카오/네이버/구글 등의 계정을 통해 간편하게 로그인하실 수 있습니다. 로그인 화면에서 원하시는 플랫폼을 선택해주세요.'
                    },
                    {
                        id: 'login2',
                        question: '아이디나 비밀번호를 잊어버렸어요.',
                        answer: '로그인 화면의 \'아이디 찾기\' 또는 \'비밀번호 재설정\'을 클릭하신 후 안내에 따라 정보를 입력해주세요.'
                    },
                    {
                        id: 'login3',
                        question: '비밀번호를 바꿨는데 로그인이 안돼요.',
                        answer: '비밀번호 변경 후에도 이전 정보가 저장되어 오류가 날 수 있습니다. 브라우저 캐시를 삭제한 후 다시 시도해주세요.'
                    },
                    {
                        id: 'login4',
                        question: '자동 로그인 기능은 없나요?',
                        answer: '현재 자동 로그인 기능은 일부 브라우저 및 간편 로그인에서만 지원됩니다. 보안상 수동 로그인을 권장드립니다.'
                    }
                ]
            },
            {
                category: '탈퇴',
                questions: [
                    {
                        id: 'withdraw1',
                        question: '회원 탈퇴는 어떻게 하나요?',
                        answer: '[마이페이지 > 회원정보 관리 > 회원 탈퇴] 메뉴에서 탈퇴 신청이 가능합니다. 탈퇴 전 주문/배송 상태를 꼭 확인해주세요.'
                    },
                    {
                        id: 'withdraw2',
                        question: '탈퇴 후 재가입할 수 있나요?',
                        answer: '네, 언제든지 재가입 가능합니다. 단, 탈퇴 후 일정 기간(예: 30일) 동안 동일 이메일로는 가입이 제한될 수 있습니다.'
                    },
                    {
                        id: 'withdraw3',
                        question: '탈퇴하면 개인정보는 모두 삭제되나요?',
                        answer: '관련 법령에 따라 일정 기간 보관해야 하는 정보(예: 구매내역)는 제외하고, 그 외 정보는 즉시 삭제됩니다.'
                    },
                    {
                        id: 'withdraw4',
                        question: '탈퇴 시 보유 포인트는 어떻게 되나요?',
                        answer: '탈퇴 시 보유 중인 적립금/쿠폰은 모두 소멸되며, 복구가 불가능합니다. 탈퇴 전 사용을 권장드립니다.'
                    }
                ]
            }
        ],
        '쿠폰/혜택/이벤트': [
            {
                category: '쿠폰',
                questions: [
                    {
                        id: 'coupon1',
                        question: '쿠폰은 어디서 발급받을 수 있나요?',
                        answer: '쿠폰은 이벤트 페이지, 앱 알림, 카카오톡 채널 등을 통해 수시로 발급됩니다. 마이페이지 > 쿠폰함에서도 확인할 수 있어요.'
                    },
                    {
                        id: 'coupon2',
                        question: '쿠폰은 어디서 사용할 수 있나요?',
                        answer: '쿠폰은 상품 주문 시 결제 페이지에서 적용할 수 있습니다. 단, 일부 상품이나 카테고리는 쿠폰 사용이 제한될 수 있어요.'
                    },
                    {
                        id: 'coupon3',
                        question: '쿠폰이 안 써져요. 왜 그런가요?',
                        answer: '유효기간이 지났거나, 최소 주문 금액 조건을 충족하지 않았거나, 특정 카테고리/브랜드에 한정된 쿠폰일 경우 사용이 불가할 수 있습니다.'
                    },
                    {
                        id: 'coupon4',
                        question: '쿠폰 여러 개를 한 번에 쓸 수 있나요?',
                        answer: '대부분의 쿠폰은 중복 사용이 불가능합니다. 1회 주문 시 한 장의 쿠폰만 적용됩니다.'
                    }
                ]
            },
            {
                category: '혜택',
                questions: [
                    {
                        id: 'benefit1',
                        question: '특별한 혜택이 있나요?',
                        answer: '신규 회원 할인, 생일 쿠폰, 첫 구매 혜택 등 다양한 이벤트가 준비되어 있습니다. 공식 이벤트 페이지를 자주 확인해주세요!'
                    },
                    {
                        id: 'benefit2',
                        question: '멤버십 제도는 어떻게 되나요?',
                        answer: '멤버십은 구매 실적에 따라 등급이 부여되며, 등급별 할인 및 쿠폰 혜택이 제공됩니다. [마이페이지 > 나의 등급]에서 확인하실 수 있어요.'
                    },
                    {
                        id: 'benefit3',
                        question: '생일 쿠폰은 어떻게 받나요?',
                        answer: '생일 7일 전에 자동으로 발급됩니다. 마이페이지 > 쿠폰함에서 확인하실 수 있습니다. ※ 생일 정보가 등록되어 있어야 합니다.'
                    }
                ]
            },
            {
                category: '이벤트',
                questions: [
                    {
                        id: 'event1',
                        question: '현재 진행 중인 이벤트는 어디서 볼 수 있나요?',
                        answer: '[이벤트 페이지] 또는 앱 메인 배너를 통해 확인하실 수 있습니다. 진행 중인 이벤트는 상단 메뉴 또는 공지사항에서도 확인 가능합니다.'
                    },
                    {
                        id: 'event2',
                        question: '이벤트 참여 시 포인트를 쓸 수 있나요?',
                        answer: '일부 이벤트는 포인트 사용이 제한될 수 있습니다. 각 이벤트 페이지의 이용 안내를 꼭 확인해주세요.'
                    },
                    {
                        id: 'event3',
                        question: '이벤트 당첨자는 어디서 확인하나요?',
                        answer: '이벤트 종료 후 3~7일 내로 공지사항 또는 개별 문자/메일로 안내드립니다.'
                    }
                ]
            },
            {
                category: '포인트',
                questions: [
                    {
                        id: 'point1',
                        question: '포인트는 어떻게 적립되나요?',
                        answer: '일반적으로 상품 구매 시 결제 금액의 일정 비율이 포인트로 적립됩니다. 이외에도 리뷰 작성, 이벤트 참여 등으로도 포인트를 받을 수 있어요.'
                    },
                    {
                        id: 'point2',
                        question: '포인트는 결제할 때 바로 사용할 수 있나요?',
                        answer: '네, 적립된 포인트는 다음 주문 시 사용 가능합니다. 단, 일부 상품 또는 최소 주문 금액 조건이 있을 수 있으니 확인해주세요.'
                    },
                    {
                        id: 'point3',
                        question: '포인트를 현금으로 바꿀 수는 없나요?',
                        answer: '포인트는 현금으로 환급되지 않으며, 상품 구매 시에만 사용 가능합니다. 유효기간이 있으므로 기간 내 사용을 권장드립니다.'
                    },
                    {
                        id: 'point4',
                        question: '포인트 유효기간은 얼마나 되나요?',
                        answer: '포인트는 적립일로부터 1년간 유효하며, 기간이 지나면 자동 소멸됩니다.'
                    }
                ]
            }
        ],
        '배송': [
            {
                category: '배송일 관련',
                questions: [
                    {
                        id: 'delivery1',
                        question: '주문하면 언제 배송되나요?',
                        answer: '결제 완료 후 평균 1~3일 내 출고되며, 지역에 따라 배송일은 조금 차이가 있을 수 있습니다. 주말, 공휴일, 기상 상황 등에 따라 지연될 수 있는 점 양해 부탁드립니다.'
                    },
                    {
                        id: 'delivery2',
                        question: '배송일을 지정할 수 있나요?',
                        answer: '죄송하지만 현재는 특정 날짜에 맞춰 배송일을 지정하는 기능은 제공하지 않고 있습니다.'
                    },
                    {
                        id: 'delivery3',
                        question: '배송일이 지났는데 아직 상품이 도착하지 않았어요.',
                        answer: '택배사 물류 사정에 따라 지연될 수 있습니다. 배송 조회 후에도 이상이 있을 경우, 고객센터로 문의해주시면 빠르게 확인해드릴게요.'
                    },
                    {
                        id: 'delivery4',
                        question: '배송 상태를 확인하고 싶어요.',
                        answer: '마이페이지 > 주문내역에서 \'배송 조회\' 버튼을 누르시면 실시간 택배 상태를 확인하실 수 있습니다.'
                    }
                ]
            },
            {
                category: '배송지 변경',
                questions: [
                    {
                        id: 'address1',
                        question: '배송지를 변경하고 싶어요. 가능할까요?',
                        answer: '상품이 출고 전이라면 변경이 가능합니다. 마이페이지 > 주문 상세 또는 고객센터로 빠르게 요청해주세요.'
                    },
                    {
                        id: 'address2',
                        question: '배송이 시작된 뒤인데, 주소를 바꿀 수 있나요?',
                        answer: '출고 후에는 주소 변경이 어렵습니다. 하지만 일부 택배사의 경우 배송 중 경로 변경이 가능하니 고객센터로 문의해주시면 확인해드릴게요.'
                    }
                ]
            }
        ],
        '취소/반품/교환': [
            {
                category: '주문 취소',
                questions: [
                    {
                        id: 'cancel1',
                        question: '주문을 취소하고 싶어요. 어떻게 하나요?',
                        answer: '배송 준비 중 상태에서는 [마이페이지 > 주문 내역]에서 직접 취소하실 수 있습니다. 단, 배송이 이미 시작된 경우엔 취소가 아닌 반품 절차로 진행됩니다.'
                    },
                    {
                        id: 'cancel2',
                        question: '배송 중인데도 주문 취소가 가능한가요?',
                        answer: '상품이 출고된 이후에는 주문 취소가 불가능하며, 수령 후 반품으로 진행해주셔야 합니다.'
                    },
                    {
                        id: 'cancel3',
                        question: '취소하면 환불은 언제 되나요?',
                        answer: '카드 결제: 카드사에 따라 3~7영업일 이내 환불됩니다. 무통장입금/계좌이체: 영업일 기준 1~2일 내 환불됩니다.'
                    }
                ]
            },
            {
                category: '반품',
                questions: [
                    {
                        id: 'return1',
                        question: '반품 접수는 어디서 하나요?',
                        answer: '[마이페이지 > 주문 내역 > 반품 신청]에서 접수하실 수 있습니다. 반품 사유와 사진 첨부(필요 시)를 꼭 입력해주세요.'
                    },
                    {
                        id: 'return2',
                        question: '상품 중 하나만 반품하고 싶어요.',
                        answer: '네, 부분 반품도 가능합니다. 반품 신청 시 반품할 상품만 선택해주세요.'
                    },
                    {
                        id: 'return3',
                        question: '반품 배송비는 누가 부담하나요?',
                        answer: '단순 변심일 경우 고객님 부담이며, 상품 불량/오배송의 경우 저희가 부담합니다. 정확한 금액은 반품 신청 시 안내됩니다.'
                    }
                ]
            },
            {
                category: '교환',
                questions: [
                    {
                        id: 'exchange1',
                        question: '교환하면 새 상품은 언제쯤 받을 수 있나요?',
                        answer: '반품 상품이 도착하고 이상이 없을 경우, 교환 상품은 1~3일 내 재배송됩니다.'
                    },
                    {
                        id: 'exchange2',
                        question: '색상이나 사이즈를 바꾸고 싶어요. 교환 가능한가요?',
                        answer: '상품 재고가 있는 경우 가능하며, 왕복 배송비는 고객님 부담입니다. [마이페이지 > 교환 신청]에서 원하는 옵션으로 교환 요청해주세요.'
                    }
                ]
            }
        ]
    }

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-16 px-6'>
            <div className="max-w-6xl mx-auto">
                {/* 헤더 섹션 */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg">
                        <FaQuestion className="text-2xl text-red-500" />
                    </div>
                    <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3'>
                        자주 묻는 질문
                    </h1>
                    <p className="text-gray-600 text-lg">궁금한 점이 있으시면 아래에서 찾아보세요</p>
                    <div className="w-32 h-1 bg-gradient-to-r from-primary via-black to-primary mx-auto mt-4 rounded-full"></div>
                </div>
                {/* 카테고리 버튼들 */}
                <div className='flex gap-6 justify-center mb-12 flex-wrap'>
                <Button 
                    color={selectedCategory === '회원' ? undefined : 'gold'} 
                    className={`w-28 h-28 rounded-full border-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                        selectedCategory === '회원' 
                            ? 'border-[--color-logo] bg-gradient-to-br from-[--color-logo] to-[--color-logo]/80 text-white shadow-xl scale-110 ring-2 ring-[--color-logo]/30' 
                            : 'border-gray-300 bg-white text-black hover:border-[--color-logo] hover:scale-105 hover:shadow-lg'
                    }`} 
                    onClick={() => handleCategoryClick('회원')}
                >
                    <div className="flex flex-col items-center gap-1">
                        <FaUser className={`text-lg ${selectedCategory === '회원' ? 'text-white' : 'text-black'}`} />
                        <span className={`text-sm font-medium ${selectedCategory === '회원' ? 'text-white' : 'text-black'}`}>회원</span>
                    </div>
                </Button>
                <Button 
                    color={selectedCategory === '쿠폰/혜택/이벤트' ? undefined : 'gold'} 
                    className={`w-28 h-28 rounded-full border-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                        selectedCategory === '쿠폰/혜택/이벤트' 
                            ? 'border-[--color-logo] bg-gradient-to-br from-[--color-logo] to-[--color-logo]/80 text-white shadow-xl scale-110 ring-2 ring-[--color-logo]/30' 
                            : 'border-gray-300 bg-white text-black hover:border-[--color-logo] hover:scale-105 hover:shadow-lg'
                    }`} 
                    onClick={() => handleCategoryClick('쿠폰/혜택/이벤트')}
                >
                    <div className="flex flex-col items-center gap-1">
                        <FaGift className={`text-lg ${selectedCategory === '쿠폰/혜택/이벤트' ? 'text-white' : 'text-black'}`} />
                        <span className={`text-xs font-medium ${selectedCategory === '쿠폰/혜택/이벤트' ? 'text-white' : 'text-black'}`}>쿠폰/혜택</span>
                    </div>
                </Button>
                <Button 
                    color={selectedCategory === '배송' ? undefined : 'gold'} 
                    className={`w-28 h-28 rounded-full border-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                        selectedCategory === '배송' 
                            ? 'border-[--color-logo] bg-gradient-to-br from-[--color-logo] to-[--color-logo]/80 text-white shadow-xl scale-110 ring-2 ring-[--color-logo]/30' 
                            : 'border-gray-300 bg-white text-black hover:border-[--color-logo] hover:scale-105 hover:shadow-lg'
                    }`} 
                    onClick={() => handleCategoryClick('배송')}
                >
                    <div className="flex flex-col items-center gap-1">
                        <FaTruck className={`text-lg ${selectedCategory === '배송' ? 'text-white' : 'text-black'}`} />
                        <span className={`text-sm font-medium ${selectedCategory === '배송' ? 'text-white' : 'text-black'}`}>배송</span>
                    </div>
                </Button>
                <Button 
                    color={selectedCategory === '취소/반품/교환' ? undefined : 'gold'} 
                    className={`w-28 h-28 rounded-full border-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                        selectedCategory === '취소/반품/교환' 
                            ? 'border-[--color-logo] bg-gradient-to-br from-[--color-logo] to-[--color-logo]/80 text-white shadow-xl scale-110 ring-2 ring-[--color-logo]/30' 
                            : 'border-gray-300 bg-white text-black hover:border-[--color-logo] hover:scale-105 hover:shadow-lg'
                    }`} 
                    onClick={() => handleCategoryClick('취소/반품/교환')}
                >
                    <div className="flex flex-col items-center gap-1">
                        <FaExchangeAlt className={`text-lg ${selectedCategory === '취소/반품/교환' ? 'text-white' : 'text-black'}`} />
                        <span className={`text-xs font-medium ${selectedCategory === '취소/반품/교환' ? 'text-white' : 'text-black'}`}>취소/반품</span>
                    </div>
                </Button>
            </div>

            {/* Q&A 섹션 */}
            <div className="w-full max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>{selectedCategory} 문의</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full"></div>
                </div>

                {/* Q&A 아코디언 */}
                <div className="space-y-6">
                    {qnaData[selectedCategory]?.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            {/* 카테고리 제목 */}
                            <div className="flex items-center mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mr-3">
                                    <FaMapMarkerAlt className="text-black text-lg " />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {section.category}
                                </h2>
                            </div>
                            
                            {/* 질문들 */}
                            <div className="space-y-3">
                                {section.questions.map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden bg-gradient-to-r from-gray-50 to-white shadow-sm hover:shadow-md transition-all duration-200">
                                        {/* 질문 */}
                                        <div 
                                            className="p-5 cursor-pointer hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 transition-all duration-200 flex justify-between items-center group"
                                            onClick={() => toggleQuestion(item.id)}
                                        >
                                            <div className="font-medium text-gray-800 flex items-start">
                                                <span className="text-primary font-bold text-xl mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-200">Q.</span>
                                                <span className="leading-relaxed">{item.question}</span>
                                            </div>
                                            <div className={`w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ml-4 flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200 ${
                                                openQuestions.has(item.id) ? 'bg-primary text-white' : ''
                                            }`}>
                                                <span className={`transform transition-transform duration-300 text-primary ${
                                                    openQuestions.has(item.id) ? 'rotate-180 text-white' : ''
                                                }`}>
                                                    ▼
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* 답변 */}
                                        {openQuestions.has(item.id) && (
                                            <div className="px-5 pb-5 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-t border-gray-100 animate-fadeIn">
                                                <div className="text-gray-700 leading-relaxed pt-4">
                                                    <div className="flex items-start">
                                                        <span className="text-orange-500 font-bold text-xl mr-3 mt-0.5">A.</span>
                                                        <span className="text-gray-700">{item.answer}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default QnAForm