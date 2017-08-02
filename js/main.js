$(function(){
	
	var api = new API( "javascript" );
	
	api.add( 
			"SmartGeoKit3D", 
			"SmartGeoKit3D sgk3d = SmartGeoKit3D( String main )",
			"SmartGeoKit3D 객체 생성자 함수",
			{
				"*main": "화면을 표시할 DOM Element 아이디"
			},
			{
				"sgk3d": "SmartGeoKit3D 인스턴스 객체"
			},
			"var sgk3d = new SmartGeoKit3D( 'main' );"
		);
	
	api.add( 
			"SmartGeoKit3D.prototype.init", 
			"SmartGeoKit3D.prototype.init( Function initCallback )",
			"SmartGeoKit3D 최초 변수 초기화 및 로드 함수",
			{
				"initCallback": "엔진 로드가 완료되면 실행되는 함수"
			},
			null,
			"sgk3d.init( function () {\n" +
			"\n" + 
			"	// 로드가 된 이후에 실행될 로직\n" +
			"	sgk3d.addCube();\n" +
			"\n" + 
			"} );"
		);
	
	api.add(
			"SmartGeoKit3D.prototype.transformInit", 
			"SmartGeoKit3D.prototype.transformInit(  )",
			"객체편집모드 로드 함수",
			null,
			null,
			"sgk3d.transformInit();"
		);
	
	api.add(
			"SmartGeoKit3D.transform.set", 
			"SmartGeoKit3D.transform.set( Object option )",
			"객체편집 함수",
			{
				"Number option.position.x": "객체가 이동할 x좌표",
				"Number option.position.y": "객체가 이동할 y좌표",
				"Number option.position.z": "객체가 이동할 z좌표",
				"Number option.rotation.x": "객체가 회전할 x각도",
				"Number option.rotation.y": "객체가 회전할 y각도",
				"Number option.rotation.z": "객체가 회전할 z각도",
				"Number option.scale.x": "객체 크기에 적용할 x배율",
				"Number option.scale.y": "객체 크기에 적용할 y배율",
				"Number option.scale.z": "객체 크기에 적용할 z배율"
			},
			null,
			"sgk3d.transform.set( {\n" +
			"	position: { x: 100, y: 100, z: 0 }\n" +
			"	rotation: { x: 0, y: 0, z: Math.PI / 2 }\n" +
			"	scale: { x: 1, y: 2, z: 1 }\n" +
			"} );"
		);
	
	api.add(
			"SmartGeoKit3D.transform.setMode", 
			"SmartGeoKit3D.transform.setMode( String mode )",
			"객체편집 형태 변경 함수",
			{
				"mode(='translate')": "이동편집모드(기본값)",
				"mode(='rotate')": "회전편집모드",
				"mode(='scale')": "크기편집모드"
			},
			null,
			"sgk3d.transform.setMode( 'translate' );"
		);
	
	api.add(
			"SmartGeoKit3D.transform.setSpace", 
			"SmartGeoKit3D.transform.setSpace( String space )",
			"객체편집 좌표계 변경 함수",
			{
				"space(='world')": "객체가 속한 좌표계(기본값)",
				"space(='local')": "객체 중심 좌표계"
			},
			null,
			"sgk3d.transform.setSpace( 'local' );"
		);
	
	api.add(
			"SmartGeoKit3D.transform.setSize", 
			"SmartGeoKit3D.transform.setSize( Number size )",
			"객체편집 컨트롤러 크기 변경 함수",
			{
				"size": "변경할 컨트롤러 크기"
			},
			null,
			"sgk3d.transform.setSize( 30 );"
		);
	
	api.add(
			"SmartGeoKit3D.transform.on", 
			"SmartGeoKit3D.transform.on(  )",
			"객체편집 시작 함수",
			null,
			null,
			"sgk3d.transform.on();"
		);
	
	api.add(
			"SmartGeoKit3D.transform.off", 
			"SmartGeoKit3D.transform.off(  )",
			"객체편집 종료 함수",
			null,
			null,
			"sgk3d.transform.on();"
		);
	
	api.add(
			"SmartGeoKit3D.transform.attach", 
			"SmartGeoKit3D.transform.attach( THREE.Object3D object )",
			"객체편집 대상 변경 함수",
			{ "*object": "편집할 대상 객체" },
			null,
			"// cube객체 조회\n" +
			"var cube = sgk3d.getObjectByName( 'cube' );\n" +
			"\n" + 
			"// cube객체 편집\n" +
			"sgk3d.transform.attach( cube );"
		);
	
	api.add(
			"SmartGeoKit3D.prototype.setScanMode", 
			"Boolean enable = SmartGeoKit3D.prototype.setScanMode(  )",
			"객체 선택가능한 스캔모드 토글형 스위치 함수",
			null,
			{ "*enable": "스캔모드 실행여부" },
			"// 스캔모드 실행버튼\n" +
			"var scanmodeOnBtn = document.querySelector('#scanmode_on');\n" +
			"scanmodeOnBtn.addEventListener('click', function(){\n" +
			"	var isScanMode = sgk3d.setScanMode();\n" + 
			"	if( isScanMode === false ){\n" +
			"		sgk3d.setScanMode();\n" +
			"	}\n" + 
			"}, false);\n" +
			"\n" + 
			"// 스캔모드 종료버튼\n" +
			"var scanmodeOffBtn = document.querySelector('#scanmode_off');\n" +
			"scanmodeOffBtn.addEventListener('click', function(){\n" +
			"	var isScanMode = sgk3d.setScanMode();\n" + 
			"	if( isScanMode === true ){\n" +
			"		sgk3d.setScanMode();\n" +
			"	}\n" + 
			"}, false);\n"
		);
	
	
	api.add(
			"SmartGeoKit3D.prototype.setFloor", 
			"SmartGeoKit3D.prototype.setFloor( Object option )",
			"바닥 변경 함수",
			{ 
				"Number option.width": "넓이 (기본값: 3500)",
				"Number option.height": "높이 (기본값: 2725)",
				"String option.src.A": "해상도 낮은 이미지 (기본값: 기존 이미지A)",
				"String option.src.B": "해상도 높은 이미지 (기본값: 기존 이미지B)",
				"Number option.increasingDirection.x": "x축 방향 (기본값: 1)",
				"Number option.increasingDirection.y": "y축 방향 (기본값: 1)"
			},
			null,
			"// 좌하단으로 바닥 표시\n" +
			"sgk3d.setFloor( {\n" +
			"	increasingDirection: { x: -1, y: -1 }\n" + 
			"} );\n"
		);
	
	
	api.add(
			"SmartGeoKit3D.prototype.cameraPositionSet", 
			"SmartGeoKit3D.prototype.cameraPositionSet( String direction )",
			"중앙을 시점으로 카메라 고정된 위치 이동 함수",
			{ 
				"direction(='front')": "정면 상단으로 이동",
				"direction(='rear')": "후면 상단으로 이동",
				"direction(='left')": "좌측 상단으로 이동",
				"direction(='right')": "우측 상단으로 이동",
				"direction(='top')": "정 상단으로 이동",
			},
			null,
			"sgk3d.cameraPositionSet( 'top' );"
		);
	
	
	api.add(
			"SmartGeoKit3D.prototype.tweenCameara", 
			"SmartGeoKit3D.prototype.tweenCameara( Object option )",
			"카메라의 위치와 시점을 변경하는 함수",
			{ 
				"Number option.Position.x": "카메라 위치 x (기본값: 고정된 위치 정면 상단 x)",
				"Number option.Position.y": "카메라 위치 y (기본값: 고정된 위치 정면 상단 y)",
				"Number option.Position.z": "카메라 위치 z (기본값: 고정된 위치 정면 상단 z)",
				"Number option.CameraLookAt.x": "카메라 시점 x (기본값: 카메라 마지막 시점 x)",
				"Number option.CameraLookAt.y": "카메라 시점 y (기본값: 카메라 마지막 시점 y)",
				"Number option.CameraLookAt.z": "카메라 시점 z (기본값: 카메라 마지막 시점 z)",
				"Number option.Runtime": "변경되는 시간 (기본값: 1200)",
			},
			null,
			"sgk3d.tweenCamera({" +
			"	Position: { x: 1500, y: 1300, z: 1400 },\n" +
			"	CameraLookAt: { x: 100, y: 100, z: 0 },\n" +
			"	RunTime: 1500\n" + 
			"});"
		);
	
	
	api.add(
			"SmartGeoKit3D.prototype.addPillar", 
			"SmartGeoKit3D.prototype.addPillar( Object option )",
			"기둥 추가 함수",
			{ 
				"String option.type(='box')": "사각기둥 (기본값)",
				"String option.type(='cylinder')": "원기둥",
				"String option.type(='polygon')": "다각기둥",
				"Number option.size": "단면 길이(사각기둥) || 기둥의 지름(원기둥) (기본값: 20)",
				"Number option.height": "높이 (기본값: 250)",
				"Number option.x": "위치 x (기본값: 500)",
				"Number option.y": "위치 y (기본값: 500)",
				"String option.name": "기둥명",
				"Number option.fontsize": "이름표 글자 크기 (기본값: 40)",
				"String option.color": "기둥색 (기본값: '#33AAFF')",
				"Boolean option.enableNameplate": "이름표 사용 여부 (기본값: true)",
				"Number option.NameplateScale": "이름표 크기 (기본값: 0.3)",
				"Object option.property": "사용자 정의 속성"
			},
			null,
			"sgk3d.addPillar({\n" +
			"	type: 'polygon',\n" +
			"	height: 300\n" +
			"	x: 1500,\n" +
			"	y: 1500,\n" +
			"	name: '다각기둥_01',\n" +
			"	color: '#00FF00',\n" +
			"	enableNameplate: false,\n" +
			"	property: {\n" +
			"		pillarId: 'pillar_01',\n" +
			"		pillarTexture: 'stone',\n" +
			"		pillarManagerId: 'managerId'\n" +
			"	}\n" + 
			"});"
		);
	
	
	api.add(
			"SmartGeoKit3D.prototype.addBay", 
			"SmartGeoKit3D.prototype.addBay( Object option )",
			"바닥 영역 추가 함수",
			{ 
				"Array<Number> option.x": "x 좌표 배열",
				"Array<Number> option.y": "y 좌표 배열",
				"String option.name": "베이명 (기본값: 'ZONE')",
				"Number option.fontsize": "이름표 글자 크기 (기본값: 30)",
				"Object option.property": "사용자 정의 속성"
			},
			null,
			"sgk3d.addBay({\n" +
			"	x: [ 0, 0, 500, 500 ],\n" +
			"	y: [ 0, 500, 500, 0 ],\n" +
			"	name: '위험지역_01',\n" +
			"});"
		);
	
	
	api.add(
			"SmartGeoKit3D.prototype.addHatch", 
			"SmartGeoKit3D.prototype.addHatch( Object option )",
			"문 추가 함수",
			{ 
				"Number option.x": "x 좌표 (기본값: 100)",
				"Number option.y": "y 좌표 (기본값: 100)",
				"Number option.z": "z 좌표 (기본값: -7)",
				"Number option.r": "z축 회전 degree값 (기본값: 0)",
				"Number option.w": "넓이 (기본값: 40)",
				"Number option.h": "높이 (기본값: 100)",
				"Number option.d": "두께 (기본값: 10)",
				"String option.type(='Door')": "일반문종류 (기본값)",
				"String option.type(='Hatch')": "상하미닫이문종류 ",
				"String option.name": "문명칭 (기본값: 'Hatch')",
				"Number option.fontsize": "이름표 글자 크기 (기본값: 40)",
				"Boolean option.enableNameplate": "이름표 사용 여부 (기본값: true)",
				"Number option.NameplateScale": "이름표 크기 (기본값: 0.3)",
				"Object option.property": "사용자 정의 속성"
			},
			null,
			"sgk3d.addHatch({\n" +
			"	x: 50, y: 50, r: 45, w: 100, h: 50, d: 8,\n" +
			"	type: 'Hatch',\n" +
			"	name: '가스실 입구',\n" +
			"	property: {\n" +
			"		clickCallback: function(){\n" +
			"			alert( '가스실 입구' );\n" +
			"		}\n" +
			"	}\n" +
			"});"
		);
	
	
	api.add(
			"SmartGeoKit3D.prototype.addTank", 
			"SmartGeoKit3D.prototype.addTank( Object option )",
			"문 추가 함수",
			{ 
				"Number option.x": "x 좌표 (기본값: 2200)",
				"Number option.y": "y 좌표 (기본값: -2400)",
				"Number option.z": "z 좌표 (기본값: 0)",
				"Number option.size": "지름 (기본값: 100)",
				"Number option.amount": "길이 (기본값: 150)",
				"Number option.BodySegment": "몸통 굴곡 정도 (기본값: 18)",
				"Number option.BevelSegment": "모서리 굴곡 정도 (기본값: 4)",
				"String option.name": "탱크명 (기본값: 'Tank')",
				"Number option.color": "탱크색 (기본값: 'rgb(88,126,194)')",
				"Number option.rotationX": "x 회전 (기본값: 0)",
				"Number option.rotationY": "y 회전 (기본값: 0)",
				"Number option.rotationZ": "z 회전 (기본값: 0)",
				"Number option.fontsize": "이름표 글자 크기 (기본값: 40)",
				"Boolean option.enableNameplate": "이름표 사용 여부 (기본값: true)",
				"Number option.NameplateScale": "이름표 크기 (기본값: 0.3)",
				"Object option.property": "사용자 정의 속성"
			},
			null,
			"sgk3d.addTank({\n" +
			"	x: 50, y: 50, z: 60,\n" +
			"	size: 50,\n" +
			"	amount: 120,\n" +
			"	name: '염소탱크_01',\n" +
			"	color: '#ff0000',\n" +
			"	rotationY: 90\n" +
			"});"
		);
	
	
	api.add(
			"SmartGeoKit3D.prototype.addPipe", 
			"SmartGeoKit3D.prototype.addPipe( Object option )",
			"배관 추가 함수",
			{ 
				"Array<{ Number x: x좌표, Number y: y좌표, Number z: z좌표 }> option.path": "배관 좌표 배열",
				"Number option.segment": "굴곡 정도 (기본값: 8)",
				"String option.name": "배관명 (기본값: 'Pipe')",
				"String option.color": "배관색 (기본값: 'rgb(88,150,88)')",
				"Boolean option.transparent": "투명도 사용 여부 (기본값: false)",
				"Number option.opacity": "투명 정도 0~1 (기본값: 1)",
				"Object option.property": "사용자 정의 속성"
			},
			null,
			"sgk3d.addPipe({\n" +
			"	path: [\n" +
			"		{ x: 0, y: 0, z: 0 },\n" +
			"		{ x: 0, y: 0, z: 50 },\n" +
			"		{ x: 50, y: 0, z: 50 },\n" +
			"		{ x: 50, y: 0, z: 0 }\n" +
			"	],\n" +
			"	segment: 16,\n" +
			"	name: 'Fab계통로004',\n" +
			"	color: '#ff0000',\n" +
			"	transparent: true,\n" +
			"	opacity: 0.5\n" +
			"});"
		);
	
});