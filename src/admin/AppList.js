const Applist = () => {
    return (
        <div>
        <div>
            <ul>
                <li>앱 등록</li>
                <li>앱 관리</li>
                <li>설정</li>
                <li>모든 앱</li>
            </ul>
        </div>
        <div>
            <p>모든 앱</p>
            <hr />
            <ul>
                <li>전체 보기</li>
                <li>서비스 중</li>
                <li>삭제 신청</li>
                <li>서비스 종료</li>
            </ul>
            <table>
                <thead>
                    <tr>
                        <th>아이콘</th>
                        <th>앱 이름</th>
                        <th>상태</th>
                        <th>삭제 요청</th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>

                </tbody>

            </table>
        </div>
            
    </div>   
    )
}

export default Applist;