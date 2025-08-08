# 슬금: 슬기로운 금융생활 
## 디자인 시스템 가이드: Atomic Design 기반 구조

이 프로젝트는 UI를 Atomic Design Pattern으로 조직합니다. 목표는 재사용성 극대화, 변경 영향 최소화, 일관된 인터페이스입니다. 아래 규칙과 디렉터리 구조를 기준으로 컴포넌트를 설계하세요.

### 계층 요약
- **atom**: 가장 작은, 더 이상 분해하기 어려운 단위. 스타일 가능한 기본 빌딩블록. 비즈니스 로직 없음.
- **molecule**: 2개 이상의 atom(또는 작은 molecule)의 조합. 한 가지 역할에 집중.
- **organism**: 여러 molecule/atom의 유의미한 구획(section). 리스트/헤더/카드그리드 등.
- **template**: 페이지 레이아웃 수준. organism들을 배치하고 레이아웃만 책임. 데이터 로직 없음.

계층 간 의존성 규칙(단방향)
- atom ← 사용 불가 (최하위)
- molecule → atom
- organism → molecule, atom
- template → organism, molecule, atom
- page/route → template (비즈니스 데이터/효과는 여기서 연결)

금지 사항
- 상위 계층을 하위에서 import 금지 (예: atom이 molecule을 의존하면 안 됨)
- template에 데이터 페칭/상태 관리 금지 (배치와 레이아웃만)

---

## 디렉터리 구조
```text
src/components/
  atom/                   # 최소 단위 (아이콘, 버튼, 토글, 인풋 등)
  molecule/
    (service)/            # 도메인 한정 molecule (서비스 전용)
      Navigator.molecule.tsx
  organism/               # 섹션 단위 컴포넌트
  template/
    (service)/            # 도메인 한정 템플릿
      OverView.template.tsx
    sign-in/
```
도메인 한정 컴포넌트는 해당 도메인 폴더(예: `(service)/`) 아래에 두고, 범용 컴포넌트는 루트(`atom/`, `molecule/`, `organism/`, `template/`)에 배치합니다.

`src/app`와의 연결
```text
src/app/
  layout.tsx            # 전역 레이아웃(서버)
  layout.client.tsx     # 전역 Provider/컨테이너(클라이언트)
  (service)/
    layout.tsx          # 도메인 레이아웃(하단 네비 포함, UI 배치만)
    page.tsx            # 템플릿 조합 및 데이터 연결
```

---

## 네이밍/파일 규칙
- 파일명: `ComponentName.level.tsx` (예: `Navigator.molecule.tsx`, `OverView.template.tsx`)
- 컴포넌트: PascalCase, 기본 export
- 도메인 스코프: `(domain)/` 폴더로 명시 (`(service)/` 등)
- 테스트/스토리(선택): `ComponentName.level.test.tsx`, `ComponentName.level.stories.tsx`

---

## 설계 원칙
- **단일 책임**: 각 컴포넌트는 하나의 역할만. 역할이 늘면 한 단계 상위로 승격.
- **순수성 유지**: atom/molecule은 사이드이펙트와 데이터 의존 제거. 상위에서 props로 주입.
- **스타일링**: Tailwind v4 사용. 전역 토큰은 `src/app/globals.css`에서 정의.
  - 예: `@theme { --color-primary: #52B788; }`
- **접근성**: 적절한 `aria-*`와 semantic 태그 사용. 아이콘은 `currentColor`를 사용해 상위 색상에 반응하도록 설계.
- **타이핑**: 공개 Props는 명시적 타입. 불필요한 any 금지. 콜백 이름은 `onXxx`.
- **클래스 전달**: 재사용 가능한 컴포넌트는 `className`/`style`를 받아 확장 가능하게.

---

## 레이어별 체크리스트
- atom
  - 비즈니스 문구/데이터 없음, 시각/인터랙션 단위만
  - 색상은 상위로부터 상속(`currentColor`)하거나 토큰 사용
- molecule
  - 여러 atom을 조합해 명확한 역할을 수행(예: `Icon + Label`)
  - 내부 상태 최소화, 외부 제어 우선
- organism
  - 섹션 단위 배치와 레이아웃. 내부에 molecule 반복/리스트 패턴 허용
- template
  - 페이지 상의 위치/배치만 담당, 데이터 연결 없음
- page(route)
  - 서버/클라이언트 데이터 바인딩, 템플릿 조합. 도메인 상태/쿼리 정의

---

## 도메인 스코핑 가이드
- 서비스 전용 하단 네비: `components/molecule/(service)/Navigator.molecule.tsx`
  - 도메인 전용 컴포넌트는 다른 도메인에서 재사용하지 않음
- 서비스 홈 상단 섹션: `components/template/(service)/OverView.template.tsx`
  - 고정 높이 493px, 레이아웃만 담당 (문구/수치 등은 상위에서 주입 가능)

---

## 의존성/데이터 흐름(요약)
- UI(components) ↔ 페이지(`app/(domain)/page.tsx`) ↔ API(`app/api/*`) ↔ 서비스 레이어(`src/services/*`)
- React Query Provider는 `layout.client.tsx`에서 초기화(전역). 컴포넌트 계층에는 Provider를 두지 않습니다.

---

## 코드 리뷰 기준(핵심)
- 올바른 계층에 배치되었는가?
- 상·하위 의존성 규칙을 위반하지 않는가?
- 도메인 스코프가 적절히 분리되었는가? (범용 vs 도메인 한정)
- Props, 접근성, 스타일 토큰 사용이 일관적인가?
- 템플릿/레이아웃에 비즈니스 로직이 섞이지 않았는가?

필요 시 `atom/molecule/organism/template` 샘플 스캐폴딩을 추가해 드릴 수 있습니다. 현재 구조를 유지하며 컴포넌트를 확장해 주세요.
