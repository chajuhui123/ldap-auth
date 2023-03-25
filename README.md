# ldap-auth

OpenLDAP을 활용한 인증 관리 시스템

### LDAP?

`LDAP(Lightweight Directory Access Protocol)`은 사용자가 조직, 구성원 등에 대한 데이터를 찾는 데 도움이 되는 프로토콜입니다

애플리케이션이 디렉터리 서비스와 정보를 주고 받는 데 필요한 통신 언어를 제공하며, 디렉터리 서비스는 네트워크 내에서 조직, 개인 및 기타 데이터에 대한 정보가 있는 위치에 액세스할 권한을 제공합니다.

또한 네트워크 상의 디렉토리 서비스 표준인 X.500의 `DAP(Directory Access Protocol)`를 기반으로한 경량화(Lightweight)된 `DAP` 버전입니다. X.500의 `DAP`는 OSI 전체 프로토콜 스택을 지원하며 운영에 매우 많은 컴퓨팅 자원을 필요로 하는 아주 무거운 프로토콜입니다. 이런 `DAP`의 복잡성을 줄이기 위해 만들어진 `LDAP`은 TCP/IP 레벨에서 더 적은 비용으로 `DAP`의 많은 기능적인 부분을 조작할 수 있도록 설계되었다고 합니다.

### Lightweight Directory

`Lightweight Directory` 는 우리가 흔히 접하는 DB와 유사한 DB의 일종이라고 표현한 글을 보았습니다.

LDAP에 대한 대부분의 요청은 `검색(Lookup)`에 대한 요청이라고 합니다. INSERT 나 UPDATE 같은 연산보다, 빠른 검색 요청에 특화되어 있기 때문입니다.

- Joy의 그룹 이름을 알려줘
- Joy의 전화번호를 알려줘
- Joy's Group의 문서를 보여줘

또한 신뢰성이나 가용성을 개선하기 위해, 쉽게 복제 될 수 있는 아키텍처로 이루어져 있다고 합니다.

```
dc:         com
             |
           domain         ## (Organization)
          /      \
ou:   People   servers    ## (Organizational Units)
      /    \     ..
uid: ..    Joy           ## (OU-specific data)
```

디렉토리 구조는 `계층적 트리 구조`로 위와 같이 구성됩니다.

노드 정보 참조는 `RDN(Relative Distinguished Name)`이나 `DN(Distinguished Name)`을 사용해서 정보를 얻어올 수 있습니다.

- RDN uid=Joy
- DN of uid=Joy,ou=People,dc=domain,dc=com.

### 활용 사례

LDAP는 LDAP 디렉터리에 데이터를 저장하고 사용자가 디렉터리에 액세스할 수 있도록 **인증**하기 위해 주로 사용됩니다.

디렉터리 서비스에 액세스하여 해당 서비스를 관리할 수 있는 **중앙 위치를 제공**하는 것입니다. LDAP를 사용하는 조직은 조직, 조직의 사용자, 자산(예: 사용자 이름, 암호)에 대한 정보를 저장, 관리, 보호할 수 있습니다. LDAP는 정보 계층 구조를 제공하여 스토리지 액세스를 간소화하는 데 도움이 되고, 기업이 성장하면서 더 많은 사용자 데이터와 자산을 확보함에 따라 중요할 수 있습니다.

**즉, <중앙관리>가 필요하고 <검색에 최적화>된 서비스를 제공합니다.**
