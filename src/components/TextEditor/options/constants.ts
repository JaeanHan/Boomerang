import { ElementFormatType } from 'lexical';

export const FONT_FAMILY_ENGLISH: [string, string][] = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];

export const FONT_FAMILY_KOREAN: [string, string][] = [
  ['NanumSquareOTF_ac', '나눔스퀘어'],
  ['Nanum Gothic', '나눔고딕'],
  ['Nanum Myeongjo', '나눔명조'],
  ['Nanum Pen Script', '나눔펜'],
  ['Noto Sans KR', '노토 산스'],
  ['Noto Serif KR', '노토 세리프'],
  ['Malgun Gothic', '맑은 고딕'],
  ['Gulim', '굴림'],
  ['Dotum', '돋움'],
  ['Batang', '바탕'],
];

export const FONT_FAMILY_OPTIONS: [string, string][] = [
  ...FONT_FAMILY_KOREAN,
  ...FONT_FAMILY_ENGLISH,
];

export const convertToKoreanIfIsKoreanFont = (fontName: string): string => {
  const font = FONT_FAMILY_KOREAN.find(([englishName, koreanName]) => {
    return englishName === fontName && koreanName !== undefined;
  });

  return font ? font[1] : fontName;
};

export const convertValueToLabel = (
  value: ElementFormatType | undefined
): string => {
  if (!value) {
    return '';
  }
  const option = alignOptions.find((option) => option.value === value);
  return option ? option.label : value;
};

export const alignOptions: {
  label: string;
  value: ElementFormatType;
  iconClass: string;
}[] = [
  { label: '왼쪽 정렬', value: 'left', iconClass: 'left-align' },
  { label: '가운데 정렬', value: 'center', iconClass: 'center-align' },
  { label: '오른쪽 정렬', value: 'right', iconClass: 'right-align' },
  { label: '양쪽 정렬', value: 'justify', iconClass: 'justify-align' },
  { label: '시작 정렬', value: 'start', iconClass: '' },
  { label: '끝 정렬', value: 'end', iconClass: '' },
];
