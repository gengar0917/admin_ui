## 개발

```bash
# 프로젝트 클론
git clone https://gitee.com/y_project/RuoYi-Vue

# 프로젝트 디렉토리로 이동
cd ruoyi-ui

# 종속성 설치
npm install

# 직접 cnpm을 사용하지 않는 것이 좋습니다. 다양한 버그가 발생할 수 있습니다. 다음과 같은 방법으로 npm 설치 속도가 느린 문제를 해결할 수 있습니다.
npm install --registry=https://registry.npmmirror.com

# 서비스 시작
npm run dev
```

브라우저 접속 http://localhost:80

## 반포

```bash
# 테스트 환경 구축
npm run build:stage

# 생산 환경 구축
npm run build:prod
```
