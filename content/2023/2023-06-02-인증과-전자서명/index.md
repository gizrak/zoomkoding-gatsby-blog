---
emoji: 🔑
title: 인증과 전자서명
date: '2023-06-02 12:00:00'
author: TED
tags: security encrypt algorithm
categories: 컴퓨터
---

### 양방향 암호화

- 내가 보낸 데이터를 `중간에서는 모르게, 받은 사람은 알 수 있게` 하는게 목적
  ![](49558-2023-6-2-14-59.png) 
- 이때, 암호화 키를 교환하기 위한 방식으로 다시 2가지로 나뉨

#### 대칭키 vs 공개키(비대칭키) 암호화

|방식|대칭키|공개키(비대칭키)|
|---|---|---|
|설명|암복호화에 사용되는 키가 동일|암복호화에 사용되는 키가 다름|
|대표 알고리즘|DES,AES,SEED|RSA,DSA|
|장점|빠름|느림|
|단점|키교환의 취약성|키교환의 안정성|

#### 공개키 암호화 활용

- 키가 2개라는 거지 어떤걸 공개키로 사용해도 무관
	- 상대에게 주는 것 `공개키`, 내가 가지는 것 `비밀키`
- 2가지 방식으로 활용이 가능
	- 내 `비밀키`로 복호화: 누구나 암호화된 메시지를 보내고, 나만 열어 볼 수 있음
	- 내 `비밀키`로 암호화: 누구나 복호화하여 볼 수 있는 메시지를 받고, 나만이 만들 수 있음

### 단방향 암호화

- 복호화가 불가능한 해시를 생성하고 이 값으로 변조되지 않았음을 증명
  ![](29699-2023-6-2-15-0.png) 
- 활용하는 대표적인 사례
	- `패스워드 암호화` ~~몇 글자 다른지 알면 양방향으로 저장하는 것~~
	- `전자서명`
- 대표적인 알고리즘
	- MD5, SHA128, SHA256, SHA384, SHA512
- 참고로, `base64`는 인코딩/디코딩이 가능하며 해시와는 다름

### 디지털 서명

- 위키백과 정의
	- 네트워크에서 송신자의 신원을 증명하는 방법으로, 송신자가 자신의 `비밀키로 암호화`한 메시지를 수신자가 송신자의 `공용 키로 해독`하는 과정
- 디지털 서명은 일반적으로 다음의 세 가지 알고리즘
	- 키 생성 알고리즘 ex) 공개키 암호화
	- 서명 생성 알고리즘 ex) 단방향 해싱 암호화 + 비밀키
	- 서명 검증 알고리즘 ex) 단방향 해싱 암호화 + 공개키
- 디지털 서명 vs 전자 서명
	- `디지털서명`: 송신자가 자신의 신원을 증명하는 절차
	- `전자서명`: 그 절차의 특정 단계에서 사용하는 정보

#### 프로세스

1. 송신자
	1. 원본 문서(평문)을 해싱
	2. 해싱된 문서 데이터를 비밀키로 `암호화`
	3. 암호화된 전자 서명(해시)를 문서에 첨부
2. 수신자
	1. 수신 문서(평문)을 해싱
	2. 첨부된 전자 서명(해시)을 공개키로 `복호화`
	3. 위 1,2번 값이 같은지 비교

### 인증과 서명

- 위에서 봤던 서명의 방식을 바탕으로 다양한 형태의 활용 방법이 개발됨
	- 사용자 인증 정보를 서명하여 위변조 걱정 없이 토큰에 싣거나
	- 인터넷에 공개된 API에서 인증된 단말기의 요청의 위변조를 검토하거나
- 디지털 서명처럼 복호화 할 필요는 없음
	- 단지 위변조만 검사하면 되기 때문에 해시가 같은지만 보면 됨
	- RSA 사용하지 않기 때문에 더 빠름

#### JWT

- 인증 정보를 지속하는 대표적인 방법으로 쿠키, 세션, 토큰이 있음
	- 어떤 방법이든 해당 정보의 주인을 확인하기 위해 DB에 대한 IO가 필요했음
- 그럼 이런 정보를 모두 토큰에 담아두면 어떨까?
	- 토큰에 사용자 정보를 노출하면 위변조 되었을 경우 위험성 존재
	- 이를 해결하기 위해 토큰에 서명을 같이 첨부
- JWT 구조
  ![](47846-2023-6-2-15-0.png) 
- HTTP 헤더 샘플 (RFC 6750 Bearer 타입)
	- `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
- 인증서버 병목 이슈
	- `HS256(HMAC+SHA256)` 방식을 사용하면, 대칭키를 배포된 모든 서버에서 공유 or 인증서버 병목
	- `RS256(RSA+SHA256)` 방식을 통해, 인증서버가 토큰을 발급(비밀키)하고 서비스에서 검증(공개키)
		- public key 조회하는 API를 인증서버가 제공
		- 서비스는 한 번만 인증서버와 통신해서 public key를 가져오면 됨

#### HMAC

- HMAC = Hash(Message, Key) + Message
- 공유키를 이용하여 전달할 메시지의 해시값을 양쪽에서 생성하여, 메시지의 위변조 여부를 판단
  ![](1942-2023-6-2-15-1.png) 
- Replay Attack
	- 공격자는 메시지 변조는 못해도, 동일한 메시지를 계속 활용 가능
	- HMAC 대상 메시지에 `timestamp`를 포함, 특정 시간 지난 후 무효화 시킴
- 자세한 내용은 [MLOps 자율주행차량 API 연동 설계](https://wiki.navercorp.com/pages/viewpage.action?pageId=1403343484#id-자율주행차량API연동설계-HMAC) 참고

### (opt) 보안 관련 용어

- SSL: 대칭키와 공개키 암호화의 장점을 모두 활용한 방법
  - 키교환이 안전한 `공개키` 방식으로 `대칭키`를 최초 한 번 교환
  - 이후 통신에서는 각 엣지에서 속도가 빠른 `대칭키` 방식으로 암호 통신
    ![](33391-2023-6-2-15-1.png) 
- TLS: SSL의 개선된 버전
- HTTPS: HTTP 통신에 SSL/TLS가 적용된 버전
- MITM: 중간 트래픽에서 가짜 인증서를 보낸 뒤 HTTPS 통신을 복호화
- RootCA: 신뢰할 수 있는 제3의 인증기관을 두어 MITM 무력화
- 인증서 체인: 인증서를 신뢰할 수 있도록 서명으로 만들어진 체인
  ![](52873-2023-6-2-15-1.png) 

### 참고
- [RAON CTF - WEB Essential](https://joongbu.raonctf.com/essential/study/web/cryptography)
- [전송 계층 보안 - 위키백과, 우리 모두의 백과사전 (wikipedia.org)](https://ko.wikipedia.org/wiki/%EC%A0%84%EC%86%A1_%EA%B3%84%EC%B8%B5_%EB%B3%B4%EC%95%88)
- [154. [Security] SSL과 인증서 구조 이해하기 : CA (Certificate Authority) 를 중심으로 : 네이버 블로그 (naver.com)](https://m.blog.naver.com/alice_k106/221468341565)
- [공개 키 기반 구조 - 위키백과, 우리 모두의 백과사전 (wikipedia.org)](https://ko.wikipedia.org/wiki/%EA%B3%B5%EA%B0%9C_%ED%82%A4_%EA%B8%B0%EB%B0%98_%EA%B5%AC%EC%A1%B0)
- [[JWT] JWT란 무엇인가? (JSON Web Token) 쉽게 정리한 core개념들 (tistory.com)](https://etloveguitar.tistory.com/101)
- [Hypertext Transfer Protocol (HTTP) Authentication Scheme Registry (iana.org)](http://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml)
- [RFC 6750: OAuth 2.0 권한 부여 프레임워크: 전달자 토큰 사용 (rfc-editor.org)](https://www.rfc-editor.org/rfc/rfc6750)
- [jwt - RS256 대 HS256: 차이점은 무엇입니까? - 스택 오버플로 (stackoverflow.com)](https://stackoverflow.com/questions/39239051/rs256-vs-hs256-whats-the-difference)
- [JWT(HS256,RS256)와 JWK(JSON Web Key) 이야기 (tistory.com)](https://idlecomputer.tistory.com/361)
- [자율주행차량 API 연동 설계 - Platform Engineering - WIKI (navercorp.com)](https://wiki.navercorp.com/pages/viewpage.action?pageId=1403343484)
