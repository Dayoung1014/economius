import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 월말정산 모달 정보
export const MonthlyInfoState = atom({
    key: 'MonthlyInfoState',
    default: null,
});

// 주식 모달 정보
export const StockInfoState = atom({
    key: 'StockInfoState',
    default: {},
});

// 부동산 모달 정보
export const RealEstateInfoState = atom({
    key: 'RealEstateInfoState',
    default: null,
});

// 금 거래소 모달 정보
export const GoldInfoState = atom({
    key: 'GoldInfoState',
    default: {},
});

// 보험 모달 정보
export const InsuranceInfoState = atom({
    key: 'InsuranceInfoState',
    default: null,
});

// 은행 모달 정보
export const BankInfoState = atom({
    key: 'BankInfoState',
    default: null,
});

// 찬스 카드 모달 정보
export const ChanceCardInfoState = atom({
    key: 'ChanceCardInfoState',
    default: null,
});

// 대이벤트 모달 정보

export const BigEventInfoState = atom({
    key: 'BigEventInfoState',
    default: null,
});

// 종합금융센터 거래 인덱스
export const FinanceCenterState = atom<number>({
    key: 'FinanceCenterState',
    default: -1, // -1 이면 거래 안함
});
