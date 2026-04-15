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
3. **패키징**: 각 바이너리를 `.zip`으로 압축
4. **릴리즈 생성**: GitHub Releases에 버전 태그와 함께 업로드

**릴리즈 에셋 구성:**

| 파일 | 대상 |
|------|------|
| `opencode-darwin-arm64.zip` | Apple Silicon (M1/M2/M3) |
| `opencode-darwin-x64.zip` | Intel Mac (AVX2 지원, 2013년 이후) |
| `opencode-darwin-x64-baseline.zip` | Intel Mac (AVX2 미지원, 2013년 이전) |
| `install` | 설치 스크립트 |

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
pcode --version
```

---

## 실행

설치 후 `pcode` 명령으로 실행합니다:

```bash
cd <프로젝트 경로>
pcode
```

`opencode` 명령도 동일하게 동작합니다. `pcode`는 설치 시 `opencode` 바이너리를 가리키는 심볼릭 링크로 자동 생성됩니다.

```
~/.opencode/bin/
├── opencode       ← 실제 바이너리
└── pcode          ← opencode 심볼릭 링크
```

---

## 업데이트

### 자동 업데이트

`pcode` 실행 시 백그라운드에서 `JeongEEE/opencode` 릴리즈를 조회합니다.  
patch 버전 업데이트는 자동으로 설치되며, minor/major 변경은 알림만 표시합니다.

자동 업데이트를 비활성화하려면 `~/.config/opencode/config.json`에 추가합니다:

```json
{
  "autoupdate": false
}
```

### 수동 업데이트

```bash
pcode upgrade
```

최신 릴리즈를 자동 감지해 `JeongEEE/opencode`의 커스텀 버전으로 업그레이드합니다.

### 특정 버전으로 업그레이드

```bash
pcode upgrade 1.0.5
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
| pcode 심볼릭 링크 | `~/.opencode/bin/pcode` |
| PATH 자동 추가 | `~/.zshrc` 또는 `~/.bashrc` |

수동으로 제거하려면:

```bash
rm -rf ~/.opencode
# ~/.zshrc에서 export PATH=~/.opencode/bin:$PATH 줄 제거
```

---

## 이 맥 vs 다른 맥

| | 이 맥 (개발용) | 다른 맥 (설치 후) |
|--|---|---|
| `pcode` 실행 | 로컬 소스 직접 실행 (`purplecode` alias) | 설치된 커스텀 바이너리 실행 (symlink) |
| 코드 수정 즉시 반영 | ✅ | ❌ (재배포 후 upgrade 필요) |
| 자동 업데이트 | ❌ | ✅ |

---

## 자주 묻는 질문

**Q. Apple Silicon(M1/M2/M3) 맥과 Intel 맥 모두 지원하나요?**  
A. 네. 설치 스크립트가 현재 맥의 아키텍처와 AVX2 지원 여부를 자동 감지해 맞는 바이너리를 설치합니다.

**Q. `opencode`와 `pcode` 중 어느 명령을 써야 하나요?**  
A. 둘 다 동일한 바이너리를 실행합니다. `pcode`를 권장합니다.

**Q. 자동 업데이트가 원본 opencode를 설치하지 않나요?**  
A. 아닙니다. 업그레이드 로직이 `JeongEEE/opencode`를 바라보도록 수정되어 있어 커스텀 버전으로만 업데이트됩니다.

**Q. 빌드가 실패하면 어떻게 하나요?**  
A. GitHub → Actions 탭에서 실패한 워크플로우 로그를 확인합니다.

**Q. my-custom 브랜치에서 직접 실행하고 싶다면?**  
A. `docs/local-dev-build.md`를 참고하세요.
