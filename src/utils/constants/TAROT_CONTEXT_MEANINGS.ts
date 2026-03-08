// 1. 타입 안정성 강화 (TypeScript Interface)
// 현재 구조를 더욱 안전하게 관리하기 위해 명시적인 인터페이스 정의를 추천합니다. 특히 contexts 내의 키(love, career 등)가 누락되거나 오타가 나는 것을 방지할 수 있습니다.

// 2. AI 프롬프트 최적화 (Context Injection)
// 현재 구조는 AI에게 컨텍스트를 주입할 때 매우 유리합니다. 하지만 AI가 이 데이터를 읽을 때, '카드 번호'와 '이름'의 매핑 정보도 필요합니다.
// - cardName: "The Fool" 같은 필드를 추가하면, AI가 데이터의 의미를 더 정확하게 파악하고 문맥에 맞는 해석을 생성하는 데 도움이 됩니다.

// 3. 역방향(Reversed) 데이터 고려
// 타로 앱의 깊이를 더하려면 카드의 '역방향' 해석이 필수적입니다. 현재 구조에서 contexts 내부에 upright와 reversed를 추가로 계층화하거나, 별도의 플래그를 두는 방식을 고려해 보세요.

// 4. 데이터 관리 효율성 (JSON 분리)
// 현재는 .ts 파일 내에 상수로 선언되어 있지만, 데이터량이 상당히 많습니다(78장 x 5개 컨텍스트).
// - 대안: 이 데이터를 JSON 파일로 분리하고, 빌드 시점에 가져오거나 CMS(Content Management System)를 통해 관리하면 코드 로직과 데이터를 분리하여 유지보수가 훨씬 수월해집니다.

// 5. advice 섹션
// advice 섹션에 '오늘의 확언(Affirmation)' 필드를 추가해 보는 것은 어떨까요? 사용자가 결과를 확인한 후 심리적으로 안정을 얻을 수 있는 한 문장을 AI가 이 데이터 기반으로 생성해 준다면 서비스의 색깔이 더 분명해질 것 같습니다.

// 질문 기반 해석, 질문 상황 특화 의미, AI 프롬프트 컨텍스트
export const TAROT_CONTEXT_MEANINGS = [
  {
    // Major Arcana
    cardId: 0,
    contexts: {
      love: {
        themes: ["새로운 관계", "자유로운 사랑"],
        interpretations: [
          "새로운 연애가 시작될 가능성이 있다.",
          "가벼운 만남이나 자유로운 관계가 나타날 수 있다.",
        ],
        advice: ["새로운 경험에 열린 마음을 가져라"],
      },
      career: {
        themes: ["새로운 도전", "모험"],
        interpretations: ["새로운 직업이나 프로젝트를 시작할 수 있다."],
        advice: ["두려움보다 호기심을 따르라"],
      },
    },
  },

  {
    cardId: 1,
    contexts: {
      love: {
        themes: ["매력", "주도권"],
        interpretations: [
          "매력적인 사람이 나타날 수 있다.",
          "관계를 적극적으로 이끌 가능성이 있다.",
        ],
        advice: ["자신의 매력을 믿어라"],
      },
      career: {
        themes: ["능력 발휘", "창조"],
        interpretations: ["자신의 능력을 활용해 새로운 기회를 만들 수 있다."],
        advice: ["이미 가진 기술을 활용하라"],
      },
    },
  },

  {
    cardId: 2,
    contexts: {
      love: {
        themes: ["숨겨진 감정", "직관"],
        interpretations: ["상대의 진짜 감정이 아직 드러나지 않았을 수 있다."],
        advice: ["직감을 믿어라"],
      },
      career: {
        themes: ["정보 수집"],
        interpretations: ["중요한 정보가 아직 드러나지 않았다."],
        advice: ["충분한 정보를 모아라"],
      },
    },
  },

  {
    cardId: 3,
    contexts: {
      love: {
        themes: ["풍요", "애정"],
        interpretations: ["사랑이 성장하고 감정적으로 풍요로운 관계가 된다."],
        advice: ["상대에게 애정을 표현하라"],
      },
      career: {
        themes: ["창의성", "성장"],
        interpretations: ["창의적인 프로젝트에서 좋은 결과가 나타난다."],
        advice: ["아이디어를 발전시켜라"],
      },
    },
  },

  {
    cardId: 4,
    contexts: {
      love: {
        themes: ["안정", "책임"],
        interpretations: ["안정적이고 책임감 있는 관계가 형성된다."],
        advice: ["관계의 기반을 튼튼히 하라"],
      },
      career: {
        themes: ["리더십", "구조"],
        interpretations: ["관리나 리더 역할을 맡을 가능성이 있다."],
        advice: ["체계를 세워라"],
      },
    },
  },

  {
    cardId: 5,
    contexts: {
      love: {
        themes: ["전통", "결혼"],
        interpretations: ["전통적인 관계나 결혼으로 이어질 수 있다."],
        advice: ["가치관을 공유하라"],
      },
      career: {
        themes: ["교육", "멘토"],
        interpretations: ["배우거나 가르치는 역할이 중요해진다."],
        advice: ["멘토의 조언을 들어라"],
      },
    },
  },

  {
    cardId: 6,
    contexts: {
      love: {
        themes: ["사랑", "선택"],
        interpretations: ["중요한 관계 선택의 순간이 온다."],
        advice: ["마음의 진실을 따르라"],
      },
      career: {
        themes: ["협력"],
        interpretations: ["파트너십이나 협력이 중요한 시기다."],
        advice: ["협력 관계를 강화하라"],
      },
    },
  },

  {
    cardId: 7,
    contexts: {
      love: {
        themes: ["관계 주도"],
        interpretations: ["관계에서 적극적으로 움직이는 사람이 된다."],
        advice: ["자신감을 가져라"],
      },
      career: {
        themes: ["목표 달성"],
        interpretations: ["강한 의지로 목표를 달성할 가능성이 높다."],
        advice: ["집중력을 유지하라"],
      },
    },
  },

  {
    cardId: 8,
    contexts: {
      love: {
        themes: ["인내", "헌신"],
        interpretations: ["관계를 유지하려면 인내가 필요하다."],
        advice: ["부드러운 힘을 사용하라"],
      },
      career: {
        themes: ["꾸준한 노력"],
        interpretations: ["지속적인 노력이 성과를 만든다."],
        advice: ["포기하지 마라"],
      },
    },
  },

  {
    cardId: 9,
    contexts: {
      love: {
        themes: ["거리", "성찰"],
        interpretations: ["잠시 혼자 생각할 시간이 필요할 수 있다."],
        advice: ["자신의 감정을 이해하라"],
      },
      career: {
        themes: ["전문성"],
        interpretations: ["혼자 집중하는 연구나 전문 작업이 중요하다."],
        advice: ["깊이 있는 탐구를 하라"],
      },
    },
  },

  {
    cardId: 10,
    contexts: {
      love: {
        themes: ["관계 변화"],
        interpretations: ["관계 상황이 예상치 못하게 변할 수 있다."],
        advice: ["흐름을 받아들여라"],
      },
      career: {
        themes: ["기회"],
        interpretations: ["예상하지 못한 기회가 나타날 수 있다."],
        advice: ["변화를 활용하라"],
      },
    },
  },

  {
    cardId: 11,
    contexts: {
      love: {
        themes: ["공정성", "균형"],
        interpretations: ["관계에서 공정한 균형이 중요하다."],
        advice: ["정직하게 행동하라"],
      },
      career: {
        themes: ["계약", "법"],
        interpretations: ["계약이나 공식적인 결정이 중요하다."],
        advice: ["객관적으로 판단하라"],
      },
    },
  },

  {
    cardId: 12,
    contexts: {
      love: {
        themes: ["기다림", "희생"],
        interpretations: ["관계 상황이 잠시 정체될 수 있다."],
        advice: ["관점을 바꿔라"],
      },
      career: {
        themes: ["지연"],
        interpretations: ["프로젝트가 예상보다 늦어질 수 있다."],
        advice: ["서두르지 마라"],
      },
    },
  },

  {
    cardId: 13,
    contexts: {
      love: {
        themes: ["관계 변화", "종결"],
        interpretations: ["현재 관계가 끝나거나 큰 변화가 올 수 있다."],
        advice: ["새로운 시작을 받아들여라"],
      },
      career: {
        themes: ["직업 변화"],
        interpretations: ["커리어 방향이 크게 바뀔 가능성이 있다."],
        advice: ["변화를 준비하라"],
      },
    },
  },

  {
    cardId: 14,
    contexts: {
      love: {
        themes: ["조화", "균형"],
        interpretations: ["관계가 점점 안정되고 조화로워진다."],
        advice: ["균형을 유지하라"],
      },
      career: {
        themes: ["협력"],
        interpretations: ["협업을 통해 좋은 결과가 나온다."],
        advice: ["조화를 추구하라"],
      },
    },
  },

  {
    cardId: 15,
    contexts: {
      love: {
        themes: ["집착", "유혹"],
        interpretations: ["관계에서 집착이나 의존이 나타날 수 있다."],
        advice: ["건강한 경계를 유지하라"],
      },
      career: {
        themes: ["물질 집착"],
        interpretations: ["물질적 목표에 지나치게 집중할 수 있다."],
        advice: ["균형을 유지하라"],
      },
    },
  },

  {
    cardId: 16,
    contexts: {
      love: {
        themes: ["충격", "갈등"],
        interpretations: ["관계에서 예상 못한 갈등이 나타날 수 있다."],
        advice: ["진실을 받아들여라"],
      },
      career: {
        themes: ["구조 변화"],
        interpretations: ["직장 구조가 급격히 변할 수 있다."],
        advice: ["변화에 유연하게 대응하라"],
      },
    },
  },

  {
    cardId: 17,
    contexts: {
      love: {
        themes: ["치유", "희망"],
        interpretations: ["관계가 회복되거나 새로운 희망이 나타난다."],
        advice: ["희망을 유지하라"],
      },
      career: {
        themes: ["영감"],
        interpretations: ["창의적 아이디어가 좋은 결과를 만든다."],
        advice: ["비전을 믿어라"],
      },
    },
  },

  {
    cardId: 18,
    contexts: {
      love: {
        themes: ["불확실성", "혼란"],
        interpretations: ["상대의 감정이 명확하지 않을 수 있다."],
        advice: ["성급한 판단을 피하라"],
      },
      career: {
        themes: ["불명확 상황"],
        interpretations: ["직장 상황이 아직 명확하지 않다."],
        advice: ["정보를 더 확인하라"],
      },
    },
  },

  {
    cardId: 19,
    contexts: {
      love: {
        themes: ["행복", "기쁨"],
        interpretations: ["밝고 긍정적인 관계가 형성된다."],
        advice: ["기쁨을 나누어라"],
      },
      career: {
        themes: ["성공"],
        interpretations: ["노력의 결과가 드러나고 인정받는다."],
        advice: ["자신감을 가져라"],
      },
    },
  },

  {
    cardId: 20,
    contexts: {
      love: {
        themes: ["관계 재평가"],
        interpretations: ["관계를 다시 돌아보고 중요한 결정을 내린다."],
        advice: ["과거를 정리하라"],
      },
      career: {
        themes: ["중요 결정"],
        interpretations: ["커리어에서 중요한 판단의 시기다."],
        advice: ["자신의 진짜 목표를 생각하라"],
      },
    },
  },

  {
    cardId: 21,
    contexts: {
      love: {
        themes: ["완성", "성취"],
        interpretations: ["관계가 안정되고 완성 단계에 들어간다."],
        advice: ["성취를 받아들여라"],
      },
      career: {
        themes: ["목표 달성"],
        interpretations: ["오랫동안 노력한 목표가 완성된다."],
        advice: ["다음 단계 준비"],
      },
    },
  },
  // Minor Arcana
  // Wands
  {
    cardId: 22,
    contexts: {
      love: {
        themes: ["새로운 열정", "로맨스 시작"],
        interpretations: [
          "새로운 설렘이나 강한 끌림이 시작될 수 있다.",
          "연애에서 강한 열정이 생길 가능성이 있다.",
        ],
        advice: ["감정을 자연스럽게 표현하라"],
      },
      career: {
        themes: ["새 프로젝트", "창의적 시작"],
        interpretations: ["새로운 아이디어나 프로젝트가 시작될 가능성이 있다."],
        advice: ["아이디어를 행동으로 옮겨라"],
      },
    },
  },

  {
    cardId: 23,
    contexts: {
      love: {
        themes: ["관계 방향", "미래 계획"],
        interpretations: ["관계의 미래에 대해 고민하게 될 수 있다."],
        advice: ["장기적인 관점을 생각하라"],
      },
      career: {
        themes: ["전략", "계획"],
        interpretations: ["장기 계획을 세우는 시기다."],
        advice: ["큰 그림을 그려라"],
      },
    },
  },

  {
    cardId: 24,
    contexts: {
      love: {
        themes: ["관계 발전"],
        interpretations: ["관계가 점점 성장하고 발전할 가능성이 있다."],
        advice: ["서로의 미래를 함께 계획하라"],
      },
      career: {
        themes: ["확장", "성장"],
        interpretations: ["사업이나 프로젝트가 확장될 가능성이 있다."],
        advice: ["기회를 적극 활용하라"],
      },
    },
  },

  {
    cardId: 25,
    contexts: {
      love: {
        themes: ["안정", "축하"],
        interpretations: ["관계가 안정되고 행복한 순간을 맞을 수 있다."],
        advice: ["기쁨을 함께 나누어라"],
      },
      career: {
        themes: ["성과", "축하"],
        interpretations: ["프로젝트나 목표가 성공적으로 마무리된다."],
        advice: ["성과를 인정하고 다음 목표를 준비하라"],
      },
    },
  },

  {
    cardId: 26,
    contexts: {
      love: {
        themes: ["갈등", "경쟁"],
        interpretations: ["사소한 의견 충돌이 생길 수 있다."],
        advice: ["갈등을 건설적으로 해결하라"],
      },
      career: {
        themes: ["경쟁", "도전"],
        interpretations: ["직장에서 경쟁이 심해질 수 있다."],
        advice: ["경쟁을 성장 기회로 활용하라"],
      },
    },
  },

  {
    cardId: 27,
    contexts: {
      love: {
        themes: ["관계 인정"],
        interpretations: ["관계가 주변 사람들에게 인정받을 수 있다."],
        advice: ["자신감을 가져라"],
      },
      career: {
        themes: ["성공", "인정"],
        interpretations: ["노력의 결과가 인정받고 좋은 평가를 받을 수 있다."],
        advice: ["성과를 유지하라"],
      },
    },
  },

  {
    cardId: 28,
    contexts: {
      love: {
        themes: ["관계 방어"],
        interpretations: [
          "관계를 지키기 위해 노력해야 하는 상황이 올 수 있다.",
        ],
        advice: ["자신의 입장을 분명히 하라"],
      },
      career: {
        themes: ["도전 유지"],
        interpretations: ["경쟁 속에서 자신의 위치를 지켜야 한다."],
        advice: ["포기하지 말고 버텨라"],
      },
    },
  },

  {
    cardId: 29,
    contexts: {
      love: {
        themes: ["빠른 관계 진행"],
        interpretations: ["관계가 예상보다 빠르게 발전할 수 있다."],
        advice: ["흐름을 잘 활용하라"],
      },
      career: {
        themes: ["빠른 변화"],
        interpretations: ["프로젝트나 업무가 빠르게 진행된다."],
        advice: ["기회를 놓치지 마라"],
      },
    },
  },

  {
    cardId: 30,
    contexts: {
      love: {
        themes: ["피로", "관계 부담"],
        interpretations: ["관계를 유지하는 과정에서 피로가 쌓일 수 있다."],
        advice: ["휴식을 취하고 균형을 유지하라"],
      },
      career: {
        themes: ["마지막 노력"],
        interpretations: ["목표 달성 직전까지 많은 노력이 필요하다."],
        advice: ["조금만 더 노력하라"],
      },
    },
  },

  {
    cardId: 31,
    contexts: {
      love: {
        themes: ["부담", "책임"],
        interpretations: ["관계에서 책임이 커질 수 있다."],
        advice: ["혼자 모든 것을 떠안지 마라"],
      },
      career: {
        themes: ["업무 과중"],
        interpretations: ["업무 부담이 커질 수 있다."],
        advice: ["일을 분배하라"],
      },
    },
  },

  {
    cardId: 32,
    contexts: {
      love: {
        themes: ["새로운 관심"],
        interpretations: ["새로운 사람에게 관심이 생길 수 있다."],
        advice: ["호기심을 따라가라"],
      },
      career: {
        themes: ["새 기회 탐색"],
        interpretations: ["새로운 아이디어나 기회를 발견할 수 있다."],
        advice: ["배우는 자세를 유지하라"],
      },
    },
  },

  {
    cardId: 33,
    contexts: {
      love: {
        themes: ["열정적 관계"],
        interpretations: ["강렬하고 빠르게 진행되는 관계가 될 수 있다."],
        advice: ["감정에 휘둘리지 않도록 균형을 유지하라"],
      },
      career: {
        themes: ["강한 추진력"],
        interpretations: ["목표를 향해 빠르게 행동하는 시기다."],
        advice: ["방향을 명확히 하라"],
      },
    },
  },

  {
    cardId: 34,
    contexts: {
      love: {
        themes: ["자신감", "매력"],
        interpretations: ["자신감 있는 태도가 관계에 긍정적인 영향을 준다."],
        advice: ["자신을 믿어라"],
      },
      career: {
        themes: ["리더십"],
        interpretations: ["팀이나 프로젝트에서 리더 역할을 맡을 수 있다."],
        advice: ["주도적으로 행동하라"],
      },
    },
  },

  {
    cardId: 35,
    contexts: {
      love: {
        themes: ["주도적 관계"],
        interpretations: ["관계를 이끌어가는 역할을 할 수 있다."],
        advice: ["비전을 공유하라"],
      },
      career: {
        themes: ["비전", "사업"],
        interpretations: ["장기적인 목표를 세우고 추진하는 시기다."],
        advice: ["큰 그림을 보고 행동하라"],
      },
    },
  },
  {
    cardId: 36,
    contexts: {
      love: {
        themes: ["사랑 시작", "감정 흐름"],
        interpretations: [
          "새로운 사랑이나 감정적인 연결이 시작될 가능성이 있다.",
          "관계에서 깊은 감정이 생겨날 수 있다.",
        ],
        advice: ["감정을 솔직하게 표현하라"],
      },
      career: {
        themes: ["감정적 만족"],
        interpretations: ["자신이 진정으로 좋아하는 일을 찾게 될 수 있다."],
        advice: ["마음이 끌리는 방향을 고려하라"],
      },
    },
  },

  {
    cardId: 37,
    contexts: {
      love: {
        themes: ["상호 연결", "연애 시작"],
        interpretations: ["서로 끌리는 관계가 형성될 가능성이 있다."],
        advice: ["서로의 감정을 존중하라"],
      },
      career: {
        themes: ["협력 관계"],
        interpretations: ["좋은 협력 관계나 파트너십이 형성된다."],
        advice: ["협력을 통해 성장하라"],
      },
    },
  },

  {
    cardId: 38,
    contexts: {
      love: {
        themes: ["즐거운 관계", "우정"],
        interpretations: [
          "연애에서 즐거운 시간과 행복한 순간이 많아질 수 있다.",
        ],
        advice: ["기쁨을 함께 나누어라"],
      },
      career: {
        themes: ["팀워크"],
        interpretations: ["팀 프로젝트에서 좋은 분위기가 형성된다."],
        advice: ["협력과 소통을 유지하라"],
      },
    },
  },

  {
    cardId: 39,
    contexts: {
      love: {
        themes: ["권태", "감정 거리"],
        interpretations: ["관계에서 지루함이나 감정적 거리감이 생길 수 있다."],
        advice: ["새로운 방식으로 관계를 바라보라"],
      },
      career: {
        themes: ["동기 부족"],
        interpretations: ["현재 일에 대한 흥미가 줄어들 수 있다."],
        advice: ["새로운 목표를 설정하라"],
      },
    },
  },

  {
    cardId: 40,
    contexts: {
      love: {
        themes: ["상실", "이별 감정"],
        interpretations: ["연애에서 실망이나 상처를 경험할 수 있다."],
        advice: ["감정을 억누르지 말고 받아들여라"],
      },
      career: {
        themes: ["실망"],
        interpretations: ["기대했던 결과가 나오지 않을 수 있다."],
        advice: ["실패에서 배우라"],
      },
    },
  },

  {
    cardId: 41,
    contexts: {
      love: {
        themes: ["추억", "과거 인연"],
        interpretations: ["과거 연인이나 오래된 인연이 다시 나타날 수 있다."],
        advice: ["과거 경험을 지혜로 활용하라"],
      },
      career: {
        themes: ["옛 인맥"],
        interpretations: ["과거 인맥이나 경험이 도움이 될 수 있다."],
        advice: ["과거의 연결을 활용하라"],
      },
    },
  },

  {
    cardId: 42,
    contexts: {
      love: {
        themes: ["감정 혼란", "선택"],
        interpretations: ["여러 감정이나 관계 사이에서 혼란을 느낄 수 있다."],
        advice: ["현실적인 선택을 하라"],
      },
      career: {
        themes: ["많은 가능성"],
        interpretations: ["여러 선택지가 나타나지만 방향이 불명확할 수 있다."],
        advice: ["현실적인 계획을 세워라"],
      },
    },
  },

  {
    cardId: 43,
    contexts: {
      love: {
        themes: ["관계 종료", "떠남"],
        interpretations: [
          "현재 관계에서 멀어지거나 새로운 길을 선택할 수 있다.",
        ],
        advice: ["자신에게 더 의미 있는 길을 선택하라"],
      },
      career: {
        themes: ["직업 변화"],
        interpretations: [
          "현재 직업에서 벗어나 새로운 길을 찾을 가능성이 있다.",
        ],
        advice: ["자신의 가치에 맞는 일을 찾아라"],
      },
    },
  },

  {
    cardId: 44,
    contexts: {
      love: {
        themes: ["행복", "감정 만족"],
        interpretations: ["관계에서 만족과 행복을 느낄 수 있다."],
        advice: ["현재의 행복을 즐겨라"],
      },
      career: {
        themes: ["목표 만족"],
        interpretations: ["일에서 성취감과 만족을 얻을 수 있다."],
        advice: ["성과를 인정하라"],
      },
    },
  },

  {
    cardId: 45,
    contexts: {
      love: {
        themes: ["행복한 관계", "가족"],
        interpretations: ["안정적이고 행복한 관계가 형성된다."],
        advice: ["관계의 조화를 유지하라"],
      },
      career: {
        themes: ["조화로운 환경"],
        interpretations: ["직장 환경이 안정되고 협력적일 수 있다."],
        advice: ["긍정적인 분위기를 유지하라"],
      },
    },
  },

  {
    cardId: 46,
    contexts: {
      love: {
        themes: ["감정 표현", "로맨스"],
        interpretations: ["누군가가 감정을 표현하거나 고백할 가능성이 있다."],
        advice: ["감정을 솔직하게 표현하라"],
      },
      career: {
        themes: ["창의적 기회"],
        interpretations: ["창의적인 아이디어가 새로운 기회를 만들 수 있다."],
        advice: ["상상력을 활용하라"],
      },
    },
  },

  {
    cardId: 47,
    contexts: {
      love: {
        themes: ["로맨틱 추구"],
        interpretations: ["누군가가 적극적으로 사랑을 표현할 수 있다."],
        advice: ["감정과 현실을 균형 있게 보라"],
      },
      career: {
        themes: ["창의적 목표"],
        interpretations: [
          "감정이나 창의성이 중요한 역할을 하는 일에 집중하게 된다.",
        ],
        advice: ["이상과 현실을 조화시켜라"],
      },
    },
  },

  {
    cardId: 48,
    contexts: {
      love: {
        themes: ["공감", "감정 이해"],
        interpretations: ["깊은 감정적 이해와 공감이 관계를 강화한다."],
        advice: ["상대의 감정을 존중하라"],
      },
      career: {
        themes: ["돌봄 역할"],
        interpretations: ["사람을 돕는 역할이나 상담 역할이 중요해질 수 있다."],
        advice: ["직관을 활용하라"],
      },
    },
  },

  {
    cardId: 49,
    contexts: {
      love: {
        themes: ["성숙한 사랑"],
        interpretations: ["감정적으로 안정된 관계가 형성된다."],
        advice: ["감정 균형을 유지하라"],
      },
      career: {
        themes: ["감정 관리"],
        interpretations: ["리더십에서 감정 관리 능력이 중요하다."],
        advice: ["차분하게 판단하라"],
      },
    },
  },
  // Swords
  {
    cardId: 50,
    contexts: {
      love: {
        themes: ["진실", "명확한 대화"],
        interpretations: [
          "관계에서 숨겨졌던 진실이 드러난다.",
          "솔직한 대화가 관계의 방향을 결정한다.",
        ],
        advice: ["감정을 숨기지 말고 명확하게 표현하라"],
      },
      career: {
        themes: ["새로운 아이디어", "판단력"],
        interpretations: [
          "문제를 해결할 새로운 전략이 떠오른다.",
          "논리적 판단이 상황을 뒤집는다.",
        ],
        advice: ["데이터와 사실을 기반으로 결정하라"],
      },
      personal: {
        themes: ["통찰", "정신적 각성"],
        interpretations: ["혼란스러웠던 상황의 본질을 깨닫는다."],
        advice: ["현실을 직시하라"],
      },
    },
  },

  {
    cardId: 51,
    contexts: {
      love: {
        themes: ["회피", "감정 차단"],
        interpretations: ["갈등을 피하려 하며 관계가 정체된다."],
        advice: ["결정을 미루지 말라"],
      },
      career: {
        themes: ["결정 보류"],
        interpretations: ["정보 부족으로 판단을 미루는 상황이다."],
        advice: ["추가 정보를 확보하라"],
      },
      personal: {
        themes: ["내면 갈등"],
        interpretations: ["감정과 이성이 충돌한다."],
        advice: ["현실을 회피하지 말라"],
      },
    },
  },

  {
    cardId: 52,
    contexts: {
      love: {
        themes: ["상처", "이별"],
        interpretations: ["관계에서 실망이나 배신이 발생할 수 있다."],
        advice: ["감정을 억누르지 말고 정리하라"],
      },
      career: {
        themes: ["실패", "실망"],
        interpretations: ["기대했던 결과가 나오지 않을 가능성이 있다."],
        advice: ["감정적 반응보다 분석을 우선하라"],
      },
      personal: {
        themes: ["정서적 고통"],
        interpretations: ["내면의 상처가 드러난다."],
        advice: ["치유 과정에 시간을 투자하라"],
      },
    },
  },

  {
    cardId: 53,
    contexts: {
      love: {
        themes: ["거리두기", "휴식"],
        interpretations: ["관계에서 잠시 시간을 두는 것이 필요하다."],
        advice: ["서두르지 말고 상황을 정리하라"],
      },
      career: {
        themes: ["재정비"],
        interpretations: ["업무 피로로 휴식이 필요한 시기다."],
        advice: ["과로를 줄이고 전략을 재정비하라"],
      },
      personal: {
        themes: ["회복"],
        interpretations: ["정신적 휴식이 필요하다."],
        advice: ["휴식을 계획적으로 취하라"],
      },
    },
  },

  {
    cardId: 54,
    contexts: {
      love: {
        themes: ["갈등", "승패 집착"],
        interpretations: ["사소한 싸움이 관계를 악화시킬 수 있다."],
        advice: ["이기는 것보다 관계를 우선하라"],
      },
      career: {
        themes: ["경쟁", "불편한 승리"],
        interpretations: ["경쟁에서 이기더라도 관계가 손상될 수 있다."],
        advice: ["장기적 평판을 고려하라"],
      },
      personal: {
        themes: ["자기중심적 태도"],
        interpretations: ["타인과의 갈등이 반복된다."],
        advice: ["자기 행동을 점검하라"],
      },
    },
  },

  {
    cardId: 55, // Six of Swords
    contexts: {
      love: {
        themes: ["이동", "회복"],
        interpretations: ["어려운 시기를 지나 관계가 안정 방향으로 이동한다."],
        advice: ["과거 문제를 내려놓아라"],
      },
      career: {
        themes: ["환경 변화"],
        interpretations: ["부서 이동이나 직무 변화 가능성이 있다."],
        advice: ["변화를 수용하라"],
      },
      personal: {
        themes: ["심리적 이동"],
        interpretations: ["힘든 상황에서 벗어나기 시작한다."],
        advice: ["앞을 바라보라"],
      },
    },
  },

  {
    cardId: 56, // Seven of Swords
    contexts: {
      love: {
        themes: ["비밀", "신뢰 문제"],
        interpretations: ["관계에서 숨기는 행동이 발생할 수 있다."],
        advice: ["신뢰 문제를 직면하라"],
      },
      career: {
        themes: ["전략", "비공개 행동"],
        interpretations: ["공식적으로 드러나지 않는 전략이 필요할 수 있다."],
        advice: ["윤리적 기준을 점검하라"],
      },
      personal: {
        themes: ["회피 전략"],
        interpretations: ["정면 대응을 피하려는 경향이 있다."],
        advice: ["문제를 직접 해결하라"],
      },
    },
  },

  {
    cardId: 57, // Eight of Swords
    contexts: {
      love: {
        themes: ["제약", "심리적 구속"],
        interpretations: ["관계에서 자유롭지 못하다고 느낄 수 있다."],
        advice: ["스스로 만든 제한을 점검하라"],
      },
      career: {
        themes: ["제약 환경"],
        interpretations: ["업무에서 선택지가 제한되어 보인다."],
        advice: ["새로운 관점을 찾아라"],
      },
      personal: {
        themes: ["자기 제한"],
        interpretations: ["두려움 때문에 행동하지 못한다."],
        advice: ["가능성을 재평가하라"],
      },
    },
  },

  {
    cardId: 58, // Nine of Swords
    contexts: {
      love: {
        themes: ["불안", "후회"],
        interpretations: ["관계 문제로 심리적 스트레스가 커질 수 있다."],
        advice: ["혼자 고민하지 말라"],
      },
      career: {
        themes: ["압박", "스트레스"],
        interpretations: ["업무 압박으로 정신적 부담이 증가한다."],
        advice: ["문제를 구조적으로 정리하라"],
      },
      personal: {
        themes: ["불면", "과도한 걱정"],
        interpretations: ["생각이 과도하게 반복된다."],
        advice: ["현실적 해결책에 집중하라"],
      },
    },
  },

  {
    cardId: 59, // Ten of Swords
    contexts: {
      love: {
        themes: ["끝", "배신"],
        interpretations: ["관계가 근본적으로 끝나는 상황이 나타날 수 있다."],
        advice: ["현실을 받아들이고 재정비하라"],
      },
      career: {
        themes: ["프로젝트 종료"],
        interpretations: ["어떤 일이 완전히 끝난다."],
        advice: ["새로운 시작을 준비하라"],
      },
      personal: {
        themes: ["극단적 피로"],
        interpretations: ["정신적으로 한계에 도달한 상태다."],
        advice: ["완전한 리셋이 필요하다"],
      },
    },
  },

  {
    cardId: 60, // Page of Swords
    contexts: {
      love: {
        themes: ["관찰", "경계"],
        interpretations: ["상대의 행동을 주의 깊게 살피는 단계다."],
        advice: ["성급한 판단을 피하라"],
      },
      career: {
        themes: ["정보 탐색"],
        interpretations: ["새로운 정보를 배우는 단계다."],
        advice: ["기초 정보를 충분히 확보하라"],
      },
      personal: {
        themes: ["호기심"],
        interpretations: ["지적 호기심이 강해진다."],
        advice: ["학습을 지속하라"],
      },
    },
  },

  {
    cardId: 61, // Knight of Swords
    contexts: {
      love: {
        themes: ["급진적 행동"],
        interpretations: ["감정보다 행동이 앞서는 관계 진행이 나타난다."],
        advice: ["속도를 조절하라"],
      },
      career: {
        themes: ["공격적 추진"],
        interpretations: ["목표 달성을 위해 빠르게 행동한다."],
        advice: ["충동적 결정을 경계하라"],
      },
      personal: {
        themes: ["강한 추진력"],
        interpretations: ["목표를 향해 강하게 밀어붙인다."],
        advice: ["계획을 점검하라"],
      },
    },
  },

  {
    cardId: 62, // Queen of Swords
    contexts: {
      love: {
        themes: ["독립성"],
        interpretations: ["감정에 휘둘리지 않는 관계 태도가 나타난다."],
        advice: ["명확한 기준을 유지하라"],
      },
      career: {
        themes: ["전문성"],
        interpretations: ["논리적 판단과 경험이 중요한 역할을 한다."],
        advice: ["객관성을 유지하라"],
      },
      personal: {
        themes: ["현실 인식"],
        interpretations: ["상황을 냉정하게 판단할 수 있다."],
        advice: ["감정과 사실을 구분하라"],
      },
    },
  },

  {
    cardId: 63, // King of Swords
    contexts: {
      love: {
        themes: ["이성 중심"],
        interpretations: ["관계에서 논리적 접근이 강조된다."],
        advice: ["감정 표현도 고려하라"],
      },
      career: {
        themes: ["전략적 리더십"],
        interpretations: ["전략적 판단과 지적 리더십이 요구된다."],
        advice: ["객관적 기준을 유지하라"],
      },
      personal: {
        themes: ["지적 통제"],
        interpretations: ["상황을 분석하고 구조화하는 능력이 강화된다."],
        advice: ["공정한 판단을 유지하라"],
      },
    },
  },
  // pentacles
  {
    cardId: 64, // Ace of Pentacles
    contexts: {
      love: {
        themes: ["안정적 시작"],
        interpretations: ["현실적으로 안정적인 관계가 시작될 가능성이 있다."],
        advice: ["관계를 현실적인 기반 위에서 구축하라"],
      },
      career: {
        themes: ["새로운 기회"],
        interpretations: ["새로운 직무나 프로젝트 기회가 나타난다."],
        advice: ["기회를 실제 행동으로 연결하라"],
      },
      money: {
        themes: ["재정 기회"],
        interpretations: ["수입 증가 또는 투자 기회가 생길 수 있다."],
        advice: ["장기적 관점에서 자산을 관리하라"],
      },
      personal: {
        themes: ["현실적 성장"],
        interpretations: ["구체적인 목표를 통해 삶이 안정되기 시작한다."],
        advice: ["실행 가능한 계획을 세워라"],
      },
      health: {
        themes: ["건강 회복"],
        interpretations: ["몸 상태가 안정적으로 개선될 수 있다."],
        advice: ["생활 습관을 꾸준히 관리하라"],
      },
    },
  },

  {
    cardId: 65, // Two of Pentacles
    contexts: {
      love: {
        themes: ["균형"],
        interpretations: ["연애와 다른 삶의 영역 사이 균형이 필요하다."],
        advice: ["시간 관리에 신경 써라"],
      },
      career: {
        themes: ["멀티태스킹"],
        interpretations: ["여러 업무를 동시에 처리해야 하는 상황이다."],
        advice: ["우선순위를 명확히 정하라"],
      },
      money: {
        themes: ["재정 조율"],
        interpretations: ["지출과 수입 사이 균형을 맞춰야 한다."],
        advice: ["지출 구조를 점검하라"],
      },
      personal: {
        themes: ["생활 균형"],
        interpretations: ["여러 책임을 동시에 관리하는 시기다."],
        advice: ["과부하를 피하라"],
      },
      health: {
        themes: ["생활 리듬"],
        interpretations: ["생활 패턴이 불규칙할 수 있다."],
        advice: ["일상 리듬을 안정시키라"],
      },
    },
  },

  {
    cardId: 66, // Three of Pentacles
    contexts: {
      love: {
        themes: ["협력"],
        interpretations: ["관계를 함께 만들어가는 과정이 강조된다."],
        advice: ["서로의 역할을 존중하라"],
      },
      career: {
        themes: ["팀워크"],
        interpretations: ["협업을 통해 성과가 만들어진다."],
        advice: ["전문성을 공유하라"],
      },
      money: {
        themes: ["공동 프로젝트"],
        interpretations: ["협업 기반의 수익 구조가 나타날 수 있다."],
        advice: ["파트너를 신중히 선택하라"],
      },
      personal: {
        themes: ["기술 성장"],
        interpretations: ["능력을 발전시키는 과정이 진행된다."],
        advice: ["피드백을 적극적으로 받아들여라"],
      },
      health: {
        themes: ["전문 관리"],
        interpretations: ["전문적인 건강 관리가 도움이 된다."],
        advice: ["전문가 상담을 고려하라"],
      },
    },
  },

  {
    cardId: 67, // Four of Pentacles
    contexts: {
      love: {
        themes: ["감정 통제"],
        interpretations: ["감정을 쉽게 드러내지 않는 관계 상태다."],
        advice: ["지나친 방어를 줄여라"],
      },
      career: {
        themes: ["안정 유지"],
        interpretations: ["현재 위치를 유지하려는 태도가 강하다."],
        advice: ["변화를 완전히 거부하지 말라"],
      },
      money: {
        themes: ["자산 보존"],
        interpretations: ["돈을 지키는 데 집중하는 시기다."],
        advice: ["지나친 집착을 경계하라"],
      },
      personal: {
        themes: ["통제 욕구"],
        interpretations: ["안정에 대한 집착이 강해질 수 있다."],
        advice: ["유연성을 유지하라"],
      },
      health: {
        themes: ["긴장"],
        interpretations: ["스트레스가 신체 긴장으로 나타날 수 있다."],
        advice: ["이완 훈련을 시도하라"],
      },
    },
  },

  {
    cardId: 68, // Five of Pentacles
    contexts: {
      love: {
        themes: ["소외"],
        interpretations: ["관계에서 정서적 거리감이 나타날 수 있다."],
        advice: ["서로의 어려움을 공유하라"],
      },
      career: {
        themes: ["불안정"],
        interpretations: ["직장 환경에서 불안정성을 느낄 수 있다."],
        advice: ["지원 자원을 확인하라"],
      },
      money: {
        themes: ["재정 압박"],
        interpretations: ["재정적으로 어려운 상황이 발생할 수 있다."],
        advice: ["지출을 구조적으로 점검하라"],
      },
      personal: {
        themes: ["고립감"],
        interpretations: ["도움이 필요하지만 요청하지 않는 상황이다."],
        advice: ["지원 네트워크를 활용하라"],
      },
      health: {
        themes: ["체력 저하"],
        interpretations: ["피로나 체력 저하를 경험할 수 있다."],
        advice: ["무리한 활동을 줄여라"],
      },
    },
  },

  {
    cardId: 69, // Six of Pentacles
    contexts: {
      love: {
        themes: ["균형적 교환"],
        interpretations: ["서로에게 주고받는 균형이 중요하다."],
        advice: ["일방적인 관계를 피하라"],
      },
      career: {
        themes: ["지원"],
        interpretations: ["상사나 조직의 지원을 받을 수 있다."],
        advice: ["협력 관계를 유지하라"],
      },
      money: {
        themes: ["재정 흐름"],
        interpretations: ["돈이 들어오거나 나가는 흐름이 발생한다."],
        advice: ["재정 흐름을 기록하라"],
      },
      personal: {
        themes: ["관계 균형"],
        interpretations: ["도움을 주거나 받는 상황이다."],
        advice: ["공정한 관계를 유지하라"],
      },
      health: {
        themes: ["균형 회복"],
        interpretations: ["몸 상태가 균형을 되찾는다."],
        advice: ["생활 균형을 유지하라"],
      },
    },
  },

  {
    cardId: 70, // Seven of Pentacles
    contexts: {
      love: {
        themes: ["관계 평가"],
        interpretations: ["현재 관계의 방향을 점검하는 시기다."],
        advice: ["장기적 관점에서 생각하라"],
      },
      career: {
        themes: ["성과 평가"],
        interpretations: ["지금까지의 노력 결과를 검토하는 시기다."],
        advice: ["성과를 분석하라"],
      },
      money: {
        themes: ["장기 투자"],
        interpretations: ["투자의 결과를 기다리는 단계다."],
        advice: ["조급함을 경계하라"],
      },
      personal: {
        themes: ["성장 점검"],
        interpretations: ["자기 성장의 속도를 평가한다."],
        advice: ["과정을 인정하라"],
      },
      health: {
        themes: ["회복 과정"],
        interpretations: ["건강 회복이 서서히 진행된다."],
        advice: ["꾸준함을 유지하라"],
      },
    },
  },

  {
    cardId: 71, // Eight of Pentacles
    contexts: {
      love: {
        themes: ["관계 노력"],
        interpretations: ["관계를 유지하기 위해 노력하는 단계다."],
        advice: ["작은 행동을 지속하라"],
      },
      career: {
        themes: ["기술 개발"],
        interpretations: ["전문 기술을 집중적으로 발전시키는 시기다."],
        advice: ["훈련을 지속하라"],
      },
      money: {
        themes: ["수입 기반 구축"],
        interpretations: ["꾸준한 노동이 재정 안정으로 이어진다."],
        advice: ["장기적 생산성을 높여라"],
      },
      personal: {
        themes: ["자기계발"],
        interpretations: ["기술이나 지식을 배우는 과정이다."],
        advice: ["집중력을 유지하라"],
      },
      health: {
        themes: ["생활 관리"],
        interpretations: ["꾸준한 생활 습관이 건강을 개선한다."],
        advice: ["지속 가능한 루틴을 만들라"],
      },
    },
  },

  {
    cardId: 72, // Nine of Pentacles
    contexts: {
      love: {
        themes: ["독립적 사랑"],
        interpretations: ["자기 삶이 안정된 상태에서 관계가 유지된다."],
        advice: ["자기 삶을 유지하라"],
      },
      career: {
        themes: ["성과"],
        interpretations: ["노력의 결과로 안정적인 성과를 얻는다."],
        advice: ["성과를 관리하라"],
      },
      money: {
        themes: ["재정 안정"],
        interpretations: ["경제적으로 안정된 상태다."],
        advice: ["자산을 장기적으로 관리하라"],
      },
      personal: {
        themes: ["자기 만족"],
        interpretations: ["자기 삶에 대한 만족도가 높아진다."],
        advice: ["자기 성취를 인정하라"],
      },
      health: {
        themes: ["안정"],
        interpretations: ["몸 상태가 안정적이다."],
        advice: ["현재 생활을 유지하라"],
      },
    },
  },

  {
    cardId: 73, // Ten of Pentacles
    contexts: {
      love: {
        themes: ["장기 관계"],
        interpretations: ["결혼이나 장기적 관계 안정이 강조된다."],
        advice: ["공동 미래를 계획하라"],
      },
      career: {
        themes: ["조직 안정"],
        interpretations: ["직장 환경이 안정적으로 유지된다."],
        advice: ["장기적 커리어 전략을 세워라"],
      },
      money: {
        themes: ["자산 축적"],
        interpretations: ["재정적으로 안정된 기반이 형성된다."],
        advice: ["자산 구조를 관리하라"],
      },
      personal: {
        themes: ["가족 기반"],
        interpretations: ["가족이나 공동체가 중요한 역할을 한다."],
        advice: ["관계를 유지하라"],
      },
      health: {
        themes: ["안정적 건강"],
        interpretations: ["건강 상태가 안정적으로 유지된다."],
        advice: ["예방 관리에 집중하라"],
      },
    },
  },

  {
    cardId: 74, // Page of Pentacles
    contexts: {
      love: {
        themes: ["현실적 접근"],
        interpretations: ["관계를 천천히 발전시키는 단계다."],
        advice: ["서두르지 말라"],
      },
      career: {
        themes: ["학습"],
        interpretations: ["새로운 기술이나 업무를 배우는 시기다."],
        advice: ["기초를 탄탄히 하라"],
      },
      money: {
        themes: ["재정 학습"],
        interpretations: ["돈 관리에 대해 배우는 단계다."],
        advice: ["재정 지식을 쌓아라"],
      },
      personal: {
        themes: ["성장 가능성"],
        interpretations: ["미래 성장을 위한 준비 단계다."],
        advice: ["작은 목표부터 시작하라"],
      },
      health: {
        themes: ["생활 개선"],
        interpretations: ["건강 습관을 새로 시작할 수 있다."],
        advice: ["작은 습관을 만들어라"],
      },
    },
  },

  {
    cardId: 75, // Knight of Pentacles
    contexts: {
      love: {
        themes: ["꾸준함"],
        interpretations: ["느리지만 안정적인 관계 발전이 이루어진다."],
        advice: ["성급함을 버려라"],
      },
      career: {
        themes: ["지속적 노력"],
        interpretations: ["꾸준한 노력으로 성과가 쌓인다."],
        advice: ["루틴을 유지하라"],
      },
      money: {
        themes: ["안정적 수입"],
        interpretations: ["지속적인 수입 구조가 유지된다."],
        advice: ["지속 가능한 전략을 유지하라"],
      },
      personal: {
        themes: ["책임감"],
        interpretations: ["책임감 있는 태도가 강조된다."],
        advice: ["계획을 꾸준히 실행하라"],
      },
      health: {
        themes: ["꾸준한 관리"],
        interpretations: ["지속적인 관리가 건강을 유지한다."],
        advice: ["생활 습관을 유지하라"],
      },
    },
  },

  {
    cardId: 76, // Queen of Pentacles
    contexts: {
      love: {
        themes: ["돌봄"],
        interpretations: ["관계에서 안정감과 돌봄이 강조된다."],
        advice: ["서로를 현실적으로 지원하라"],
      },
      career: {
        themes: ["실무 능력"],
        interpretations: ["현실적인 관리 능력이 중요한 역할을 한다."],
        advice: ["조직적 관리에 집중하라"],
      },
      money: {
        themes: ["자산 관리"],
        interpretations: ["재정을 안정적으로 관리할 수 있다."],
        advice: ["지출 구조를 유지하라"],
      },
      personal: {
        themes: ["생활 안정"],
        interpretations: ["생활 기반이 안정적으로 유지된다."],
        advice: ["균형을 유지하라"],
      },
      health: {
        themes: ["생활 건강"],
        interpretations: ["건강 관리가 안정적으로 이루어진다."],
        advice: ["균형 잡힌 생활을 유지하라"],
      },
    },
  },

  {
    cardId: 77, // King of Pentacles
    contexts: {
      love: {
        themes: ["책임 있는 관계"],
        interpretations: ["신뢰 기반의 안정적인 관계가 형성된다."],
        advice: ["장기적 책임을 고려하라"],
      },
      career: {
        themes: ["리더십"],
        interpretations: ["현실적인 리더십이 조직을 안정시킨다."],
        advice: ["전략적 판단을 유지하라"],
      },
      money: {
        themes: ["재정 성공"],
        interpretations: ["재정적으로 매우 안정된 상태다."],
        advice: ["자산을 장기적으로 관리하라"],
      },
      personal: {
        themes: ["성취"],
        interpretations: ["현실적인 목표를 달성한 상태다."],
        advice: ["성과를 지속적으로 유지하라"],
      },
      health: {
        themes: ["안정적 컨디션"],
        interpretations: ["건강 상태가 안정적으로 유지된다."],
        advice: ["현재 생활을 유지하라"],
      },
    },
  },
];
