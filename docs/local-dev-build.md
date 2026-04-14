# 로컬 빌드 & 개발 실행 가이드

이 문서는 opencode 소스를 로컬에서 실행하는 방법을 설명합니다.  
**전역(운영) 버전이 이미 설치되어 있는 경우**의 충돌 방지 방법도 함께 다룹니다.

---

## 사전 준비

```bash
# 의존성 설치 (루트에서)
bun install
```

---

## 전역 설치 버전과의 충돌 여부 확인

```bash
which opencode        # 전역 설치 경로 확인
opencode --version    # 현재 사용 중인 버전 확인
```

전역 버전이 `~/.opencode/bin/opencode` 에 설치되어 있고 PATH에 포함된 경우,  
아래 방법에 따라 **충돌 없이** 로컬 소스를 실행할 수 있습니다.

---

## 실행 방법

### 방법 A: Bun으로 소스 직접 실행 (권장 — 충돌 없음)

전역 바이너리와 완전히 독립적으로 동작합니다.  
코드 수정 후 재실행하면 바로 반영됩니다.

```bash
cd packages/opencode
bun run --conditions=browser ./src/index.ts
```

또는 루트의 `bun dev` 스크립트를 사용:

```bash
# 루트에서
bun dev
```

> **충돌 없음**: `opencode` 명령을 사용하지 않으므로 전역 설치에 영향을 주지 않습니다.

---

### 방법 B: 셸 alias로 전역 명령 임시 오버라이드

터미널 세션에서만 전역 `opencode` 명령을 로컬 소스로 덮어씁니다.

```bash
# 현재 셸 세션에서만 적용
alias opencode="bun run --conditions=browser /path/to/opencode/packages/opencode/src/index.ts"

# 적용 해제
unalias opencode
```

영구 적용이 필요하면 `~/.zshrc` 또는 `~/.bashrc` 에 추가합니다.

> **충돌 영향**: 해당 셸 세션에서만 전역 버전 대신 로컬 소스가 실행됩니다.  
> 다른 터미널이나 재시작 후에는 전역 버전이 복원됩니다.

---

### 방법 C: 네이티브 바이너리 빌드

Bun의 `--compile` 플래그를 사용해 단일 실행 파일로 빌드합니다.

```bash
cd packages/opencode
bun run build
```

빌드 완료 후 생성된 바이너리를 직접 실행합니다:

```bash
# 빌드된 바이너리 직접 실행 (경로 예시)
./dist/opencode-darwin-arm64

# 또는 bin 래퍼를 통해 실행 (.opencode 캐시 경로 활용)
cp dist/opencode-darwin-arm64 bin/.opencode
./bin/opencode
```

> **주의**: `bin/.opencode` 파일이 존재하면 `bin/opencode` 래퍼가 전역 바이너리 대신  
> 이 파일을 우선 실행합니다. 해당 경로에서만 동작하므로 전역 명령에는 영향이 없습니다.

> **빌드 시간**: 플랫폼에 따라 수 분이 소요될 수 있습니다.

---

### 방법 D: 환경 변수로 실행 파일 지정

`OPENCODE_BIN_PATH` 환경 변수를 설정하면 `bin/opencode` 래퍼가 해당 경로의 바이너리를 실행합니다.

```bash
OPENCODE_BIN_PATH=/path/to/my-opencode-binary opencode
```

---

### 방법 E: `purplecode` 스크립트로 임의 경로에서 실행 (권장)

`packages/opencode/bin/purplecode` 스크립트를 사용하면 **opencode 디렉토리가 아닌 어느 경로에서든** 로컬 소스를 실행할 수 있습니다.

#### 동작 원리

`purplecode`는 실행 시점의 `pwd`를 작업 디렉토리로 캡처하여 positional 인자로 전달합니다.

```bash
#!/usr/bin/env bash
TARGET="$(pwd)"
OPENCODE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$OPENCODE_ROOT"
exec bun run --conditions=browser ./src/index.ts "$TARGET" "$@"
```

> opencode의 기본 TUI 명령(`$0 [project]`)은 첫 번째 positional 인자를 작업 디렉토리로 인식합니다.  
> `--dir` 플래그는 `run` 서브커맨드 전용이므로 사용할 수 없습니다.

#### 1단계: 실행 권한 확인

```bash
ls -la packages/opencode/bin/purplecode
# -rwxr-xr-x 이어야 함. 아니라면:
chmod +x packages/opencode/bin/purplecode
```

#### 2단계: PATH에 등록

**옵션 1 — 심볼릭 링크** (영구 적용, 권장):

```bash
ln -sf /절대경로/opencode/packages/opencode/bin/purplecode ~/.local/bin/purplecode
# ~/.local/bin 이 PATH에 없다면:
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
```

**옵션 2 — 셸 alias** (현재 세션 또는 영구):

```bash
# 영구 적용: ~/.zshrc 에 추가
alias purplecode="/절대경로/opencode/packages/opencode/bin/purplecode"
```

#### `~/.zshrc` 실제 설정 예시

```zsh
# PostHog 텔레메트리 비활성화
export OMO_DISABLE_POSTHOG=true

# pcode 명령으로 로컬 소스 실행
alias pcode="/Users/jeong/Dev/MyProjects/opencode/packages/opencode/bin/purplecode"
```

#### 3단계: 사용

```bash
# 원하는 프로젝트 경로로 이동 후 실행
cd ~/Dev/MyProjects/some-project
purplecode

# 또는 경로를 직접 지정
purplecode /절대경로/some-project
```

> **충돌 없음**: `opencode` 명령명을 사용하지 않으므로 전역 설치와 완전히 독립적입니다.

---

## 방법 비교

| 방법 | 전역 충돌 | 빌드 필요 | 코드 수정 즉시 반영 | 다른 경로에서 실행 | 추천 용도 |
|------|-----------|-----------|---------------------|--------------------|-----------|
| A. Bun 직접 실행 | ✅ 없음 | ❌ 불필요 | ✅ 즉시 | ❌ opencode 디렉토리만 | 일반 개발 |
| B. 셸 alias | ⚠️ 세션 내 덮어씀 | ❌ 불필요 | ✅ 즉시 | ❌ opencode 디렉토리만 | 명령어 테스트 |
| C. 네이티브 빌드 | ✅ 없음 (별도 경로) | ✅ 필요 | ❌ 재빌드 필요 | ✅ 가능 | 성능 테스트 |
| D. 환경 변수 | ✅ 없음 | ✅ 필요 | ❌ 재빌드 필요 | ✅ 가능 | CI / 스크립트 |
| **E. purplecode 스크립트** | ✅ 없음 | ❌ 불필요 | ✅ 즉시 | ✅ **어디서든 가능** | **일반 개발 + 다른 프로젝트** |

---

## 전역 설치 버전 관리

| 작업 | 명령 |
|------|------|
| 전역 버전 확인 | `opencode --version` |
| 전역 설치 경로 확인 | `which opencode` |
| 전역 버전 업데이트 | `opencode upgrade` |
| 전역 버전 제거 | `rm -rf ~/.opencode` + PATH에서 제거 |

---

## 자주 묻는 질문

**Q. 로컬 소스 실행 중에 설정 파일이 전역 버전과 공유되나요?**  
A. 네. `~/.config/opencode/` 및 `~/.local/share/opencode/` 경로를 공유합니다.  
언어 설정, 테마, KV 데이터 등이 두 버전 사이에 공유됩니다.

**Q. 어떤 버전으로 실행 중인지 확인하려면?**  
A. 방법 A/B 실행 시 `packages/opencode/package.json`의 `version` 값이 표시됩니다.

**Q. 전역 버전에 영향을 주지 않고 완전히 분리하려면?**  
A. 별도 설정 디렉토리를 지정하는 환경 변수가 있다면 활용할 수 있습니다.  
또는 방법 A를 사용하면 설정 파일 공유 외에는 전역 버전에 영향이 없습니다.
