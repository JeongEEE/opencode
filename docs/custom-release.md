# 커스텀 빌드 릴리즈 & 배포 가이드

이 문서는 포크된 opencode(`JeongEEE/opencode`)를 빌드하여 GitHub Releases에 배포하고,  
다른 맥에서 설치하는 방법을 설명합니다.

---

## 브랜치 전략

| 브랜치 | 용도 |
|--------|------|
| `my-custom` | 기능 개발 및 커밋 (빌드 트리거 없음) |
| `my-custom-release` | 릴리즈 전용 — push 시 자동 빌드 & 배포 |

개발은 `my-custom`에서 하고, 배포할 준비가 되면 `my-custom-release`로 merge/push합니다.

---

## 릴리즈 배포하기

### 1단계: 변경 사항을 my-custom-release에 반영

```bash
# my-custom 브랜치에서 작업 후
git checkout my-custom-release
git merge my-custom
git push origin my-custom-release
```

### 2단계: GitHub Actions 자동 실행

`my-custom-release`에 push되면 `.github/workflows/release-custom.yml`이 자동으로 실행됩니다.

**워크플로우 진행 순서:**

1. **버전 결정**: GitHub Releases에서 최신 버전을 읽어 patch 자동 증가
   - 릴리즈 없음 → `1.0.0`
   - `1.0.0` 존재 → `1.0.1`
   - `1.0.1` 존재 → `1.0.2`
2. **빌드**: Ubuntu 러너에서 macOS용 바이너리 크로스컴파일
   - `opencode-darwin-arm64` (Apple Silicon)
   - `opencode-darwin-x64` (Intel Mac)
3. **패키징**: 각 바이너리를 `.zip`으로 압축
4. **릴리즈 생성**: GitHub Releases에 버전 태그와 함께 업로드
   - `opencode-darwin-arm64.zip`
   - `opencode-darwin-x64.zip`
   - `install` (설치 스크립트)

진행 상황은 GitHub → Actions 탭에서 확인할 수 있습니다.  
빌드 완료까지 약 **5~15분** 소요됩니다.

---

## 다른 맥에서 설치하기

### 최신 버전 설치

```bash
curl -fsSL https://github.com/JeongEEE/opencode/releases/latest/download/install | bash
```

설치 완료 후 새 터미널을 열거나 셸을 재로드합니다:

```bash
source ~/.zshrc   # zsh 사용 시
source ~/.bashrc  # bash 사용 시
```

### 특정 버전 설치

```bash
curl -fsSL https://github.com/JeongEEE/opencode/releases/latest/download/install | bash -s -- --version 1.0.3
```

### 설치 확인

```bash
opencode --version
```

---

## 업데이트

이미 설치된 경우에도 동일한 설치 명령을 실행하면 됩니다.  
설치된 버전과 릴리즈 버전이 같으면 자동으로 건너뜁니다.

```bash
curl -fsSL https://github.com/JeongEEE/opencode/releases/latest/download/install | bash
```

---

## 릴리즈 관리

### 릴리즈 목록 확인

```bash
gh release list --repo JeongEEE/opencode
```

또는 GitHub 웹에서 확인:  
`https://github.com/JeongEEE/opencode/releases`

### 특정 릴리즈 삭제

```bash
gh release delete v1.0.2 --repo JeongEEE/opencode
```

---

## 설치 경로

| 항목 | 경로 |
|------|------|
| 바이너리 | `~/.opencode/bin/opencode` |
| PATH 자동 추가 | `~/.zshrc` 또는 `~/.bashrc` |

수동으로 제거하려면:

```bash
rm -rf ~/.opencode
# ~/.zshrc에서 export PATH=~/.opencode/bin:$PATH 줄 제거
```

---

## 자주 묻는 질문

**Q. Apple Silicon(M1/M2/M3) 맥과 Intel 맥 모두 지원하나요?**  
A. 네. `darwin-arm64`(Apple Silicon)와 `darwin-x64`(Intel) 두 바이너리가 모두 빌드됩니다.  
설치 스크립트가 현재 맥의 아키텍처를 자동으로 감지해 맞는 바이너리를 설치합니다.

**Q. 빌드가 실패하면 어떻게 하나요?**  
A. GitHub → Actions 탭에서 실패한 워크플로우 로그를 확인합니다.  
버전 충돌이나 의존성 문제가 원인인 경우가 많습니다.

**Q. my-custom 브랜치에서 직접 실행하고 싶다면?**  
A. `docs/local-dev-build.md`를 참고하세요.
