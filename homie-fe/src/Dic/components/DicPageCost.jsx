import React, { useState } from 'react';
import styles from '../css/DicPageCost.module.css';

import talkImage1 from '../Dicimage/talkex1.png';
import talkImage2 from '../Dicimage/talkex2.png';
import talkImage3 from '../Dicimage/talkex3.png';
import talkImage4 from '../Dicimage/talkex4.png';
import DicImage1 from '../Dicimage/Dicimg1.png';
import DicImage2 from '../Dicimage/Dicimg2.png';
import DicImage3 from '../Dicimage/Dicimg3.png';
import DicImage4 from '../Dicimage/Dicimg4.png';
import DicImage5 from '../Dicimage/Dicimg5.png';
import DicImage6 from '../Dicimage/Dicimg6.png';
import DicImage7 from '../Dicimage/Dicimg7.png';
import DicImage8 from '../Dicimage/Dicimg8.png';
import DicImage9 from '../Dicimage/Dicimg9.png';
import DicImage10 from '../Dicimage/Dicimg10.png';

const DicPageCost = () => {
    const [currentModal, setCurrentModal] = useState(0);
  
  const modals = [
    { 
        id: 1,
        category: "비용 계획",
        title: "임대차계약이란?",
        layout: "layout1",
        content: (
            <div className={styles.contentType1}>
              <h3>살 집을 빌리기 위해
              맺는 계약</h3>
              <p>자취를 시작하기로 했으니 이제 ‘살 집’을 구해야 한다.
                이 때 내 소유의 집이 없다면 월세, 전세 등의 비용을 지불하고
                집주인에게 ‘집을 빌려서’ 그 집에 들어가 살게 된다.
                이 때 집을 빌려 사는 나는 〈임차인〉, 나에게 살 집을 빌려주는
                집의 소유주는 〈임대인〉이다.
                그리고 임차인이 얼마의 돈을 임대인에게 지불하기로 하고, 그
                집에서 살겠다고 약속하는 것이 바로 〈임대차 계약〉이다.
                때문에 자취를 시작하며 집을 구한다는 것은 바로 이 ‘임대차
                계약’을 맺는 것을 의미하기도 한다
                </p>       
            </div>
          )
    },
    { 
        id: 2,
        title: "월세와 보증금",
        category: "비용 계획",
        layout: "layout2",
        content: ( <div className={styles.contentType}>
            <h3>집을 빌리고,
                살아가는 데 드는
                (고정)주거비
                </h3>
              <p>월세 가격은 집에 따라 천차만별인데, 일반적으로는 서울시를
                    기준으로 1인 주거용 원룸의 경우 월 40~60만원 정도로
                    가격이 형성되어 있다.
                    또한 월세 가격은 동네별, 지역별로 비슷한 가격대가 형성된다
                    때문에 월세를 알아볼 때 주변 집들에 비해 너무 싸거나/
                    저렴하다면 그 이유를 체크해보는 것도 필요하다
                    또한 집 구하기 비용계획에 있어 월세와 함께 〈보증금〉 계획도
                    필요한데, 보증금은 ‘미래의 내가 월세를 내지 않았을 때를 
                    대비해 집주인에게 목돈을 담보로 맡겨두는 것’ 이다.
                    보증금은 담보로 맡겨두는 돈이니 나중에 집 계약이
                    만료되었을 때 모두 돌려받을 수 있다
                    집을 구하기 위해 부동산을 살피다 보면 ‘500/40’처럼
                    임대가격을 써놓은 것을 볼 수 있을 것이다.
                    이 경우 보증금 500만원에 월세 40만원짜리 집이라는 뜻이고,
                    보통 이처럼 보증금을 앞에 쓰고 월세를 뒤에 쓰는 방식이다.
                </p>
            </div>  
        )
    },
    { 
        id: 3,
        title: "관리비",
        category: "비용 계획",
        layout: "layout3",
        content: (
            <div className={styles.contentType1}>
              <h3>내가 사는 집을
                누군가가 관리해주고
                돈을 받는다
              </h3>
              <p>월세, 보증금만 마련하면 주거비가 모두 끝났다고 생각하기
                쉽지만, 매 달 지출해야하는 고정비로 〈관리비〉가 또 있다.
                관리비는 내가 사는 집을 누군가가 관리해주고 받는 비용이라고
                보면 된다. 
                아파트를 예로 든다면, 그 아파트의 계단, 정화조 등 공동 사용
                시설 청소, 엘리베이터 유지보수 등 건물의 관리와 관련된
                비용이 발생하게 되는데, 이것이 바로 ‘관리비’이다.
                월세 이외에도 매월 고정으로 발생하는 비용으로 관리비가
                발생하게 되기 때문에, ‘월세+관리비’가 실질적인 나의 월세나
                마찬가지라고 느껴질 수도 있을 것이다.
                관리비는 보통 원룸 기준으로 2~5만원 정도로 형성되어 있다.
                </p>       
            </div>
          )
    },
    { 
        id: 4,
        title: "공과금",
        category: "비용 계획",
        layout: "layout4",
        content: (
            <div className={styles.contentType1}>
              <h3>수도, 전기 등
                    살아가는 데
                    필수적인 자원 사용에
                    드는 비용</h3>
              <p>슬프게도 자취를 하며 매월 들어가는 고정비가 또 있다.
                수도세, 전기세, 난방비 등 일상생활에 필수적인 인프라를
                사용하는 데 드는 비용, 일명 〈공과금〉이다.
                수도, 전기, 가스 등의 공과금은 사용량에 비례해서 청구된다. 
                즉, 많이 쓰면 비용이 많이 나오고 적게 쓰면 비용도 적게
                나온다.
                때문에 공과금이 얼마나 나올지를 미리 정확하게 예측하는
                것은 쉽지 않다. 이 때 공과금을 대략적으로라도 가늠해보기
                위한 꿀팁이 있는데, 바로 집을 보러가서 거기에 살던 사람에게
                물어보는 것이다.
                본격적으로 부동산 중개인과 직접 집을 보러 다니다보면,
                기존에 살고 있는 세입자를 만나게 되는 경우가 있다.
                이 때, 예를 들어 난방비가 궁금하다면 이 세입자에게 “겨울에
                난방비 얼마 정도 나오셨어요?”라고 물어보는 것이 그 집에
                살면서 일상적으로 발생하게 될 난방비에 대한 감을 잡아볼 수
                있는 가장 좋은 방법이다.
                </p>       
            </div>
          )
    },
    { 
        id: 5,
        title: "부동산 수수료",
        category: "비용 계획",
        layout: "layout5",
        content: (
            <div className={styles.contentType1}>
              <h3>
                나와 집주인을
                연결해 준 부동산에게
                주는 비용
                </h3>
              <p>
              중간에서 다리 놔주는 부동산 중개인은 임대인, 임차인
            모두에게 ‘중개 서비스’를 제공하고 양쪽 모두에게서 돈(=수수료)
            을 받게 된다. 이것이 바로 〈부동산 중개수수료〉이다.
            때문에 자취 비용계획에 있어 임차인인 내가 부동산에 내야
            하는 수수료를 미리 고려해보아야 한다.
            참고로 집의 가격과 종류에 따라 중개수수료가 달라지는데,
            예를 들어 비싼 집일수록 중개수수료도 높아진다.
            법에서는 이처럼 여러 경우에 따른 부동산 중개수수료를 법으로
            정해놓았는데, 이를 〈최고 요율〉이라고 한다.
            ‘최고’라는 뜻은 ‘최대한으로 했을 때 이 정도로 받을 수 있다’는
            의미이기 때문에 실제로 얼마를 받을 지는 부동산 중개인과
            협의하기 나름이다
                </p>       
            </div>
          )
    },
    { 
      id: 6,
      title: "부동산에 연락하는 방법",
      category: "부동산 찾아가기",
      layout: "layout6",
      content: (
          <div className={styles.contentType1}>
            <h3>집 보러갈때 부동산에 연락하는 방법</h3>
            <p>이제 본격적으로 관심 매물을 보러 가기에 앞서 부동산에
              전화든, 문자든 연락을 해야 한다.
              하지만 자취 초심자라면 태어나서 처음으로 하는 부동산과의
              커뮤니케이션에 있어 도대체 어떤 이야기를 해야 하는 것인지
              그저 막막하기만 할 수도 있다.
              이러한 초심자를 위해 〈집 보러 갈 때 부동산에 연락하는
              방법〉을 크게 두 단계로 나눠보자면,
              <br />
              1. 보고싶은 매물 번호를 알려주면서 ‘이 집을 보러 가겠다’는
              의사를 전달
              <br />
              2. 부동산중개인과 실제로 만날 약속 잡기 순으로 하면 된다.
      
              </p>       
          </div>
        )
  },
  { 
    id: 7,
    title: "부동산과 해야 할 대화 <1/2>",
    category: "부동산 찾아가기",
    layout: "layout7",
    content: (
        <div className={styles.contentType1}>
          <h3>집 보러 가기 전
              ‘부동산과 꼭
              해야 할 대화’
              </h3>
          <p>
          집 보러 가기 전 부동산과 꼭 하게 되는 대화 Top5
          <br />
          ➊ 보러 갈 집의 위치
          <br />
          ➋ 보증금, 월세(or전세) 예산
          <br />
          ➌ 교통관련 필수조건
          <br />
          ➍ 입주 시기
          <br />
          ➎ 반드시 필요한 것 or 안되는 것
          <br />
          <br />
          〈예산〉을 이야기해야 하는데, 보증금과
          월세(또는 전세) 얼마까지 가능한지를 말하면 된다.
          또한, 혹시 정확한 이사날짜가 정해지지 않았다 하더라도 실제
          로 집을 계약하는 과정에서 부동산을 통해 입주 날짜를 조정하면
          되니, 처음에는 대략적인 시기만 이야기해도 괜찮다
          <br />
          
            </p>       
        </div>
      )
},
{ 
  id: 8,
  title: "부동산과 해야 할 대화 <2/2>",
    category: "부동산 찾아가기",
    layout: "layout8",
    content: (
      <>
      <div>
        <h3>집 보러 가기 전
              ‘부동산과 꼭
              해야 할 대화’
        </h3>
      </div>
        <div className={styles.contentType2}>
          <div className={styles.imageSection}>
            <img 
              src={talkImage1}
              alt="부동산 상담" 
            />
      </div>
       <div className={styles.textSection2}>
          <p>
            우선 〈관심 매물과 지역〉을 이야기해야 한다.
            그리고 상황에 따라 부동산에서 ‘예상과 다른 지역도 둘러볼
            의사가 있는지’를 물어볼 수 있다는 점을 미리 알고있으면 좋다.
            예를들어 나는 ‘양평역’만 생각하고 연락을 했지만, 경험이 많은
            중개인이 나의 조건을 듣고 “영등포시장역 근처에 더 맞는
            매물이 있는데 보실 생각 있으세요?” 라고 물어볼 수 있다는
            의미이다.
            </p>  
            </div>     
        </div>
        </>
      )
},
{ 
  id: 9,
  title: "내가 원하는 집의 필수조건 전달",
  category: "부동산 찾아가기",
  layout: "layout9",
  content: (
    <>
      <div>
        <h3>〈내가 원하는 집의 조건〉</h3>
      </div>
        <div className={styles.contentType2}>
          <div className={styles.imageSection}>
            <img 
              src={talkImage2}
              alt="부동산 상담" 
            />
      </div>
       <div className={styles.textSection}>
          <p>
          〈내가 원하는 집의 조건〉에 대하여 어느 정도 미리
          이야기를 하면 좋다.
          예를 들어 주변에 반드시 지하철역이 있었으면 좋겠다라던지,
          만약 자차가 있다면 주차가 가능해야 한다던지 하는 꼭 필요한
          것들을 위주로 이야기하면 된다.
          특히 반려동물을 키우는 경우, 반려동물 동반이 가능한 집을
          찾는다고 미리 이야기를 해야 서로 시행착오를 줄일 수 있다.
          부동산 중개인이 (내가 요청하지는 않았지만)
          괜찮아보이는 집을 역으로 제안하는 경우도 종종 있는데,
          대부분의 부동산에서는 온라인에 광고성으로 올려놓는
          매물들보다 오프라인으로 확보하고 있는(온라인에 게시하지
          않은) 괜찮은 매물의 종류가 훨씬 많기 때문에,
          이렇게 부동산에서 꿍쳐놓았다가 알려주는 매물을 적극
          고려해보는 것도 괜찮은 방법이다.
            </p>  
            </div>     
        </div>
        </>
    )
},
{ 
  id: 10,
  title: "부동산 중개인과 약속 잡기",
    category: "부동산 찾아가기",
    layout: "layout10",
    content: (
        <>
        <div>
          <h3>〈실제로 만날 약속〉잡기</h3>
        </div>
          <div className={styles.contentType2}>
            <div className={styles.imageSection}>
              <img 
                src={talkImage3}
                alt="부동산 상담" 
              />
        </div>
         <div className={styles.textSection2}>
            <p>
            마지막으로 부동산 중개인과 〈실제로 만날 약속〉을 잡으면 된다.
            참고로 부동산에 방문해서 매물을 한 개만 보는 것이 아니라,
            내가 말한 조건들과 결이 맞는 집들을 n개 이상 보게 되기
            때문에 어느정도 시간과 마음의 여유(+체력)를 가지고 가면 좋다.
            이렇게 부동산과 실제로 집을 보러 만날 약속을 잡은 이후에는
            이제 나의 두 눈으로 매물을 직접 보고, 계약을 할지 말지
            판단하는 과정만 남게 된다.
              </p>  
              </div>     
          </div>
          </>
      )
},
{ 
  id: 11,
  title: "가계약이란?",
    category: "계약/계약서",
    layout: "layout11",
    content: (
      <div className={styles.contentType1}>
            <h3>가계약이란 무엇인가?</h3>
            <p>
            가계약은 쉽게 말하면 마음에 든 매물에 ‘먼저 침발라놓기’를
            하는 것이다.
            전/월세계약을 할 때 계약금을 지불하면서 계약의 성립이
            시작한다고 보는데, 이 계약금 중 일부금액을 먼저
            가계약금으로 넣는 것이라고 보면 된다.
            보통 계약금은 통상적으로 해당 매물 보증금의 10% 정도가 된다.
            즉, 만약 계약하는 매물의 보증금이 5천만원이라면, 계약금만
            해도 500만원으로 꽤 거액이다.
            때문에 당장 수중에 계약금 500만원이 없는 경우,
            가계약금으로 비교적 소액인 30~100만원 정도를
            넣고(지불하고), ‘나중에 계약을 마저 하겠다’라고 미리 찜을
            해두는 것이다.
              </p>       
          </div>
      )
},
{ 
  id: 12,
  title: "계약이란?",
    category: "계약/계약서",
    layout: "layout12",
    content: (
      <div className={styles.contentType1}>            
            <h3>계약이란 무엇인가?</h3>
            <img className={styles.image12}
                src={DicImage1}
                alt="부동산 상담" 
              />
            <p>
            민법563조에서는 ‘계약은 약정함으로써 그 효력을 인정한다’고
            되어있다.
            아주 단순하게 표현하자면 ‘계약을 〈약정〉하는 순간 당신은 법의 지배를 받게 될 것이다’라는 것인데, 이는 마치 옛날 만화에
            나오는 주인공이 특정 주문을 외우면 변신하는 것과도 같다.
            법에서는 계약을 ‘약정’하는 방법에 대해서 구두계약이든,
            서면계약이든 당사자간의 합의가 있을 때를 약정이라고 본다.
            즉, 말로만 한 계약이든 글로 쓴 계약이든지 간에 당사자간의
            합의가 있었느냐가 ‘특정 주문’인 것이다.
            그렇기에 임대인과 임차인이 ‘우리 계약하자’는 의사를
            주고받았다면, 바로 법적인 효력이 발동되어버리고, 법적으로
            규정한 의무와 책임의 굴레에 얽히게 되는 것이라고 보면 된다.
              </p>       
          </div>
      )
},
{ 
  id: 13,
  title: "계약 전 체크",
    category: "계약/계약서",
    layout: "layout13",
    content: (
        <>
        <div>
          <h3>금액 확인하기</h3>
        </div>
          <div className={styles.contentType2}>
            <div className={styles.imageSection}>
              <img 
                src={talkImage4}
                alt="부동산 상담" 
              />
        </div>
         <div className={styles.textSection2}>
            <p>
            집의 금액 관련해 확인을 해야한다.
            처음에 봤던 보증금/월세/관리비(포함항목)의 금액이 맞는지
            다시 한 번 더 중개인과 확인을 해보고, 집을 보는 과정에서
            특이사항이 있었다면 계약서에 관련된 내용이 들어갈 수 있도록
            다시 한 번 이야기를 해야한다.
            예를 들어서 집을 보는 과정에서 벽지가 낡아서 집주인이
            도배를 새로 해주기로 했었다고 치자.
            그러면 계약에 앞서 이러한 내용들을 다시 한 번 확답을 받고, 그
            내용을 계약서에 명시할 수 있는지(보통은 계약서상에 ‘특약’으로
            들어간다) 물어보면 된다
              </p>  
              </div>     
          </div>
          </>
      )
},
{
  id: 14,
  title: "계약 전 체크",
    category: "계약/계약서",
    layout: "layout14",
    content: (
        <>
        <div>
          <h3>계약일, 잔금일 확인하기</h3>
        </div>
          <div className={styles.contentType2}>
            <div className={styles.imageSection}>
              <img 
                src={DicImage2}
                alt="부동산 상담" 
              />
        </div>
         <div className={styles.textSection2}>
            <p>
            부동산 거래의 특이한 점은 보통의 경제활동(?)과 다르게
            여러번에 걸쳐 돈을 낸다는 점이다.보통의 월세 계약의 경우 전체 거래금액이 크지 않아 
            계약금/잔금으로 2번에 걸쳐 대금을 지급하게 되며, 계약금은
            통상적으로 계약서를 작성하는 날 낸다. (금액이 큰 부동산거래의
            경우 계약금/중도금/잔금 등 3번으로 나누어 거래가 이루어진다)
            때문에 계약서를작성하는 ‘계약일’과, 나머지 금액을 지불하는
            ‘잔금일’을 별도로 결정해야 한다.
            잔금일은 계약서를 쓸 때 계약서상에 명시하게 되는데, 때문에
            잔금일에 실제로 보증금 등에 필요한 목돈을 마련할 수 있는지
            계획을 잘 세워놓아야 한다
              </p>  
              </div>     
          </div>
          </>
      )
},
{ 
  id: 15,
  title: "계약서 구조",
    category: "계약/계약서",
    layout: "layout15",
    content: (
      <div className={styles.contentType1}>            
            <h3>부동산의 표시</h3>
            <img className={styles.image12}
                src={DicImage3}
                alt="부동산 상담" 
              />
            <p>
            임차주택의 소재지, 토지,
            건물 등에 대한 표기를 하도록 되어있다. 내가 살 집과 관련된
            정보들을 적는 곳인데, 이 때 그 집의 ‘등기부등본’에 나와있는
            정보들과 일치해야 한다.특히 다가구, 다세대주택은 특히 집 문에 붙어있는 호수와
            등기부등본상의 호수가 같아야 한다. 위 예시에서 ‘임차할부분’
            (노랑표시)이라고 표시된 곳에 집의 동, 호수를 기재하면 된다. 
              </p>       
          </div>
      )
},
{ 
  id: 16,
  title: "계약서 구조",
    category: "계약/계약서",
    layout: "layout16",
    content: (
      <div className={styles.contentType1}>            
            <h3>계약의 내용</h3>
            <img className={styles.image12}
                src={DicImage4}
                alt="부동산 상담" 
              />
            <p>
            다음으로 계약금, 중도금, 잔금, 그리고 임대차기간을 작성하는
            공간이 있다.
            보증금 천만원에 월세 60만원짜리 계약을 예시로 들면, 위와
            같이 〈보증금〉, 〈계약금〉, 〈잔금〉, 〈월세〉에 대하여 각각의
            비용을 적도록 되어있다.
            여기서 기억해야 할 한 가지 중요한 부분이 있는데, ‘잔금일’
            = 즉, 잔금을 지불하는 날짜가 나의 이사날짜(입주일)이자
            계약기간의 시작날이기도 하다는 점을 기억해두자.
            이 밖에 또 주의할 점은, 월세를 지불해야하는 ‘입금계좌’에는
            임대인 계좌번호가 들어가야 한다는 것이다. 그리고 나중에
            실제로 내가 월세를 낼 때에도 계약서상에 명시된 계좌번호로
            입금을 해야 뒷탈이 없다.
            내가 쓴 계약서 양식이 위의 것과 다르더라도, 계약서 어딘가에
            집주인에게 앞으로 지불해야 할 모든 금액을 송금할 곳(계좌번호)가
            들어가있어야 한다
              </p>       
          </div>
      )
},
{ 
  id: 17,
  title: "계약서 구조",
    category: "계약/계약서",
    layout: "layout17",
    content: (
      <div className={styles.contentType1}>            
            <h3>특약사항, 인적사항</h3>
            <img className={styles.image12}
                src={DicImage5}
                alt="부동산 상담" 
              />
            <p>
            특약사항은 말그대로 계약 당사자인 임대인과 임차인이 서로
            합의하에 ‘우리는 특별히 이런 내용을 약속하자’고 넣는 것이다.
            계약서의 다른 조항들이 다 관용적이고 일반적인 내용들이라면,
            특약은 서로의 사정에 맞게끔 커스터마이징 해서 써넣는
            것이라고 보면 된다.
            다음으로 임대인과 임차인의 인적사항에 대한 부분이 있다. 여기에
            ‘임대인’으로 기재되는 집주인의 인적사항, 즉 내가 계약하는
            상대방이 실제 집주인이 맞는지를 등기부등본상의 소유주와
            집주인 주민등록증 확인을 거쳐서 꼭 확인해 보아야 한다. 이부분
            역시 실제로 계약서를 쓸 때 부동산에서 알아서 챙겨주니 너무
            걱정할 필요는 없다
              </p>       
          </div>
      )
},
{ 
  id: 18,
  title: "등기부등본",
    category: "등기부등본",
    layout: "layout16",
    content: (
      <div className={styles.contentType1}>            
            <h3>등기부등본이란?</h3>
            <p>
            보통 마음에 든 집을 계약하겠다고 하면, 부동산에서
            계약하려는 집의 등기부를 먼저 확인시켜준다. 등기부는
            앞편에서 본 것처럼 집의 ‘신분증’ 역할을 하는 공적 서류라고
            보면 된다.
            그런데 보통의 문서와 다르게, 등기부등본은 제대로 보는
            방법을 알고 보아야 한다. 어떻게 읽는지를 알지 못하면 그냥
            글자의 나열일 뿐, 무슨 의미를 담고 있는지 알 수가 없기
            때문이다.
            등기부는 계약할 집과 관련해 법적인 권리가 누구에게 있는지를
            보여주고, 재산으로서 그 집의 소위 말하는 ‘스펙’을 객관적으로
            나타내는 역할을 하기도 한다. 때문에 계약 전에 반드시 계약할
            집의 등기부를 확인해 보는 것이 필요하다.
              </p>       
          </div>
      )
},
{
  id: 19,
  title: "등기부등본의 구조",
    category: "등기부등본",
    layout: "layout19",
    content: (
        <>
        <div>
          <h3>등기부등본의 구조</h3>
        </div>
          <div className={styles.contentType2}>
            <div className={styles.imageSection}>
              <img 
                src={DicImage6}
                alt="부동산 상담" 
              />
        </div>
         <div className={styles.textSection2}>
            <p>
            ❖ 표제부 : 집과 관련된 객관적 팩트<br />
            ‘표제부’에는 집과관련된 객관적인 팩트들이
            쓰여있다고 보면 된다. 집 주소, 어떤 식으로 지은
            건물인지, 집의 면적 등이 나와있다.<br />
            ❖ 갑구 : 집의 소유권과 관련된 내용<br />
            등기부의 ‘갑구’는 집의 소유권이 누구에게, 어떻게
            넘어갔었는지 히스토리를 남기는 곳이라고 할 수 있다.<br />
            ❖ 을구 : 소유권 이외의 권리사항<br />
            등기부의 ‘을구’에는 융자, 압류, 전세권, 임차권 등 해당
            집에 얽혀있는 소유권 이외의 법적 권리관계들이 나와있다.
            그 집에 대하여 법적으로 이런저런 권리 를 갖고 있는 제 3자들이
            누구누구 있는지 나와있다고 보면 된다. 
              </p>  
              </div>     
          </div>
          </>
      )
},
{ 
  id: 20,
  title: "등기부등본 실전",
    category: "등기부등본",
    layout: "layout20",
    content: (
      <div className={styles.contentType1}>            
            <h3>등기부등본 ‘표제부’ 에서 〈주소〉 확인하기</h3>
            <img className={styles.image19}
                src={DicImage7}
                alt="부동산 상담" 
              />
            <p>
            • 등기부등본의 표제부상 집주소가 계약서와 일치하는지
            확인한다
            <br />
            • 또한 내가 ‘실제로 본 집’과 구조 등이 일치하는지도
            확인해보면 좋다
            <br />
            우선 계약을 할 집의 등기부상 주소를 확인해야 한다. 부동산에서
            집을 보러가기 전 “○○동 △△로 ◇◇◇호로 오세요~”라고
            알려주었던 주소와, 실제 내가 계약을 하려고 하는 집의
            등기부상에 쓰인 주소가 같아야 한다는 말이다.
            또한 계약서와 등기부등본 상의 ‘집의 구조(면적, 용도 등)’가
            일치하는지도 확인을 해야 한다.
            예를들어 나는 방이 2개인 집을 보고 계약을 하기로 했는데,
            등기부상에는 방이 1개인 것으로 나와있다면 해당 건물이
            불법증축 등의 방법으로 방 개수를 늘렸을 가능성도 있다. 
              </p>       
          </div>
      )
},
{ 
  id: 21,
  title: "등기부등본 실전",
    category: "등기부등본",
    layout: "layout21",
    content: (
      <div className={styles.contentType1}>            
            <h3>‘갑구’에서 소유권자 확인하기</h3>
            <img className={styles.image19}
                src={DicImage8}
                alt="부동산 상담" 
              />
            <p>
            나의 계약 상대방이 그 집의 실제 소유주와 일치하는지 확인
            또 하나 중요하게 체크할 부분은 계약을 하는 상대방이
            등기부상의 소유주와 같은사람이어야 한다는 것이다. 때문에
            소유권 관련 사항이 표시되는 〈갑구〉에서 소유주를 확인해야 한다.
            보통 부동산을 계약할 때 집주인이 외국에 있거나 하는 특수한
            상황이 아니라면 당사자가 직접 나타나기 마련인데, 간혹
            집주인을 대신해 집을 관리해주는 ‘관리인’이 집주인 행세를
            하며 부동산 계약을 하는 사건이 발생해 뉴스에 나오고는 한다. 
              </p>       
          </div>
      )
},
{ 
  id: 22,
  title: "등기부등본 실전",
    category: "등기부등본",
    layout: "layout22",
    content: (
      <div className={styles.contentType1}>            
            <h3>‘갑구’에 ‘가처분·가등기·가압류’ 확인하기</h3>
            <img className={styles.image19}
                src={DicImage9}
                alt="부동산 상담" 
              />
            <p>
            가처분·, 가등기, 가압류 등의 내용이 말소되지 않고 있다면
            계약을 하지 않는 것이 낫다
            <br />
            한편 등기부등본의 갑구에서는 집의 소유권과 관련해 문제가
            없는지도 확인해 볼 수 있다.
            갑구에서 ‘가처분, 가등기, 가압류’ 등의 여부를 확인할 수 있는데,
            만약에 이 내용들이 과거에 있었다면 (현재는 말소되었다고 해도)
            애시당초 계약을 할 때 주의를 하는 것이 좋고 ‘말소되지 않은’
            가처분, 가등기, 압류 등이 있다면 계약을 하지 말도록 하자.
              </p>       
          </div>
      )
},
{ 
  id: 22,
  title: "등기부등본 실전",
    category: "등기부등본",
    layout: "layout22",
    content: (
      <div className={styles.contentType1}>            
            <h3>‘을구’에서 근저당 확인하기, 그리고 ‘임차권등기’가
            있(었)다면 조심하기</h3>
            <img className={styles.image19}
                src={DicImage10}
                alt="부동산 상담" 
              />
            <p>
            을구에서 ‘근저당’이 있는지를 확인하고, 만약 있다면 그 집의
            실거래가 대비 70~80%로 적정수준인지 알아보자. 
            을구에 ‘임차권등기’의 흔적이 있다면 조심, 또 조심하자!!
            만약에 등기부등본을 확인했을 때 과거에 임차권등기가
            설정되었다가 지워진 흔적이 있다면, 과거에 집주인이 보증금을
            제때 돌려주지 않았었다 는 의미이다.
            말소사항을 포함해서 등기부를 떼어보면 과거에 있었던
            임차권등기의 흔적이 나온다. 이 흔적이 자주 있다면 집주인이
            상습적으로 보증금을 제 때 주지 않는 사람일 가능성이 높다는
            의미이니 주의하도록 하자.
              </p>       
          </div>
      )
},
];

  const categories = ["비용 계획", "부동산 찾아가기", "계약/계약서", "등기부등본"];

  const getCurrentCategory = () => {
    return modals[currentModal]?.category || categories[0];
  };

  const handleCategoryClick = (category) => {
    // 해당 카테고리의 첫 번째 모달 인덱스 찾기
    const targetIndex = modals.findIndex(modal => modal.category === category);
    setCurrentModal(targetIndex);
    console.log('Clicked category:', category);
    console.log('Found index:', targetIndex);
  };
  const isFirstModal = currentModal === 0;
  const isLastModal = currentModal ===  modals.length - 1;

  const handlePrevClick = () => {
    if (!isFirstModal) {
      setCurrentModal(prev => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastModal) {
      setCurrentModal(prev => prev + 1);
    }
  };

  const getModalStyle = (index) => {
    const position = index - currentModal;
    let transform = `translateX(${position * 100}%)`;
    let opacity = 1;
    
    if (Math.abs(position) > 1) {
      // 현재 모달에서 2개 이상 떨어진 모달은 숨김
      transform += ' scale(0)';
      opacity = 0;
    } else if (position !== 0) {
      // 양옆의 모달은 40%만 보이도록 조정
      // 왼쪽 모달은 -60%, 오른쪽 모달은 60% 위치에 배치
      transform = position > 0 
        ? 'translateX(60%)' 
        : 'translateX(-60%)';
      opacity = 0.2; // 약간 투명하게 처리
    }
    
    return {
      transform,
      opacity,
      visibility: Math.abs(position) > 1 ? 'hidden' : 'visible'
    };
  };

  return (
    <>
    <div className={styles.modalContainer}>
    <div className={styles.titleContainer}>
        <h1 className={styles.mainTitle}>Dictionary</h1>
        <nav className={styles.categoryNav}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                getCurrentCategory() === category ? styles.active : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </nav>
    </div>
    <div className={styles.modalsWrapper}>
        {modals.map((modal, index) => (
          <div
            key={modal.id}
            className={`${styles.modal} 
                       ${index === currentModal ? styles.active : styles.nonActive}
                       ${styles[modal.layout]}`} // 레이아웃별 클래스 적용
            style={getModalStyle(index)}
          >
            <div className={styles.modalContent}>
            <div className={styles.modalTitle}>
                <h3>{modal.title}</h3>
              </div>
              <div className={styles.contentBox}>
                <p>{modal.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.navigationButtons}>
        <button 
          className={`${styles.navButton} ${isFirstModal ? styles.disabled : ''}`}
          onClick={handlePrevClick}
          disabled={isFirstModal}
        >
          ←
        </button>
        <button 
          className={`${styles.navButton} ${isLastModal ? styles.disabled : ''}`}
          onClick={handleNextClick}
          disabled={isLastModal}
        >
          →
        </button>
      </div>
    </div>
    </>
  );
};

export default DicPageCost;