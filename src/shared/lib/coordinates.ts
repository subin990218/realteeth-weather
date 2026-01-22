interface Coordinates {
  lat: number;
  lon: number;
}

const CITY_COORDINATES: Record<string, Coordinates> = {
  '서울특별시': { lat: 37.5665, lon: 126.978 },
  '부산광역시': { lat: 35.1796, lon: 129.0756 },
  '대구광역시': { lat: 35.8714, lon: 128.6014 },
  '인천광역시': { lat: 37.4563, lon: 126.7052 },
  '광주광역시': { lat: 35.1595, lon: 126.8526 },
  '대전광역시': { lat: 36.3504, lon: 127.3845 },
  '울산광역시': { lat: 35.5384, lon: 129.3114 },
  '세종특별자치시': { lat: 36.4800, lon: 127.2890 },
  '경기도': { lat: 37.4138, lon: 127.5183 },
  '강원도': { lat: 37.8228, lon: 128.1555 },
  '충청북도': { lat: 36.6357, lon: 127.4914 },
  '충청남도': { lat: 36.6588, lon: 126.6728 },
  '전라북도': { lat: 35.8203, lon: 127.1089 },
  '전라남도': { lat: 34.8160, lon: 126.4630 },
  '경상북도': { lat: 36.4919, lon: 128.8889 },
  '경상남도': { lat: 35.4606, lon: 128.2132 },
  '제주특별자치도': { lat: 33.4890, lon: 126.4983 },
};

const DISTRICT_COORDINATES: Record<string, Coordinates> = {
  '종로구': { lat: 37.5735, lon: 126.9788 },
  '중구': { lat: 37.5641, lon: 126.9979 },
  '용산구': { lat: 37.5326, lon: 126.9910 },
  '성동구': { lat: 37.5633, lon: 127.0371 },
  '광진구': { lat: 37.5385, lon: 127.0823 },
  '동대문구': { lat: 37.5744, lon: 127.0400 },
  '중랑구': { lat: 37.6066, lon: 127.0928 },
  '성북구': { lat: 37.5894, lon: 127.0167 },
  '강북구': { lat: 37.6397, lon: 127.0255 },
  '도봉구': { lat: 37.6688, lon: 127.0472 },
  '노원구': { lat: 37.6542, lon: 127.0568 },
  '은평구': { lat: 37.6027, lon: 126.9291 },
  '서대문구': { lat: 37.5791, lon: 126.9368 },
  '마포구': { lat: 37.5663, lon: 126.9014 },
  '양천구': { lat: 37.5169, lon: 126.8665 },
  '강서구': { lat: 37.5509, lon: 126.8495 },
  '구로구': { lat: 37.4954, lon: 126.8874 },
  '금천구': { lat: 37.4519, lon: 126.8955 },
  '영등포구': { lat: 37.5264, lon: 126.8963 },
  '동작구': { lat: 37.5124, lon: 126.9393 },
  '관악구': { lat: 37.4784, lon: 126.9516 },
  '서초구': { lat: 37.4837, lon: 127.0324 },
  '강남구': { lat: 37.5172, lon: 127.0473 },
  '송파구': { lat: 37.5145, lon: 127.1050 },
  '강동구': { lat: 37.5301, lon: 127.1238 },
  '해운대구': { lat: 35.1631, lon: 129.1636 },
  '수영구': { lat: 35.1457, lon: 129.1131 },
  '남구': { lat: 35.1368, lon: 129.0843 },
  '북구': { lat: 35.1972, lon: 129.0312 },
  '동구': { lat: 35.1297, lon: 129.0450 },
  '서구': { lat: 35.0977, lon: 129.0242 },
  '사하구': { lat: 35.1046, lon: 128.9750 },
  '사상구': { lat: 35.1526, lon: 128.9913 },
  '부산진구': { lat: 35.1629, lon: 129.0531 },
  '동래구': { lat: 35.1979, lon: 129.0858 },
  '금정구': { lat: 35.2428, lon: 129.0922 },
  '연제구': { lat: 35.1760, lon: 129.0795 },
  '수성구': { lat: 35.8583, lon: 128.6308 },
  '달서구': { lat: 35.8299, lon: 128.5329 },
  '연수구': { lat: 37.4103, lon: 126.6784 },
  '남동구': { lat: 37.4471, lon: 126.7312 },
  '부평구': { lat: 37.5067, lon: 126.7218 },
  '계양구': { lat: 37.5372, lon: 126.7376 },
  '미추홀구': { lat: 37.4635, lon: 126.6502 },
  '유성구': { lat: 36.3622, lon: 127.3561 },
  '대덕구': { lat: 36.3467, lon: 127.4156 },
  '수원시': { lat: 37.2636, lon: 127.0286 },
  '성남시': { lat: 37.4201, lon: 127.1265 },
  '고양시': { lat: 37.6584, lon: 126.8320 },
  '용인시': { lat: 37.2410, lon: 127.1775 },
  '부천시': { lat: 37.5034, lon: 126.7660 },
  '안산시': { lat: 37.3219, lon: 126.8309 },
  '안양시': { lat: 37.3943, lon: 126.9568 },
  '남양주시': { lat: 37.6360, lon: 127.2165 },
  '화성시': { lat: 37.1996, lon: 126.8312 },
  '평택시': { lat: 36.9921, lon: 127.0853 },
  '의정부시': { lat: 37.7381, lon: 127.0337 },
  '시흥시': { lat: 37.3800, lon: 126.8029 },
  '파주시': { lat: 37.7600, lon: 126.7800 },
  '김포시': { lat: 37.6153, lon: 126.7156 },
  '광명시': { lat: 37.4786, lon: 126.8646 },
  '광주시': { lat: 37.4095, lon: 127.2550 },
  '군포시': { lat: 37.3616, lon: 126.9352 },
  '이천시': { lat: 37.2720, lon: 127.4350 },
  '오산시': { lat: 37.1498, lon: 127.0698 },
  '하남시': { lat: 37.5393, lon: 127.2147 },
  '춘천시': { lat: 37.8813, lon: 127.7298 },
  '원주시': { lat: 37.3422, lon: 127.9202 },
  '강릉시': { lat: 37.7519, lon: 128.8760 },
  '청주시': { lat: 36.6424, lon: 127.4890 },
  '충주시': { lat: 36.9910, lon: 127.9259 },
  '천안시': { lat: 36.8151, lon: 127.1139 },
  '아산시': { lat: 36.7898, lon: 127.0018 },
  '전주시': { lat: 35.8242, lon: 127.1480 },
  '군산시': { lat: 35.9676, lon: 126.7369 },
  '익산시': { lat: 35.9483, lon: 126.9576 },
  '목포시': { lat: 34.8118, lon: 126.3922 },
  '여수시': { lat: 34.7604, lon: 127.6622 },
  '순천시': { lat: 34.9506, lon: 127.4872 },
  '포항시': { lat: 36.0190, lon: 129.3435 },
  '경주시': { lat: 35.8562, lon: 129.2247 },
  '구미시': { lat: 36.1194, lon: 128.3444 },
  '안동시': { lat: 36.5684, lon: 128.7294 },
  '창원시': { lat: 35.2280, lon: 128.6811 },
  '진주시': { lat: 35.1796, lon: 128.1076 },
  '김해시': { lat: 35.2341, lon: 128.8893 },
  '거제시': { lat: 34.8806, lon: 128.6211 },
  '양산시': { lat: 35.3350, lon: 129.0373 },
  '제주시': { lat: 33.4996, lon: 126.5312 },
  '서귀포시': { lat: 33.2541, lon: 126.5600 },
};

export function getCoordinatesFromKoreanAddress(address: string): Coordinates | null {
  const parts = address.split(' ');

  for (const part of parts.reverse()) {
    if (DISTRICT_COORDINATES[part]) {
      return DISTRICT_COORDINATES[part];
    }
  }

  for (const part of parts) {
    if (CITY_COORDINATES[part]) {
      return CITY_COORDINATES[part];
    }
  }

  const city = parts.find(p => CITY_COORDINATES[p]);
  if (city) {
    return CITY_COORDINATES[city];
  }

  return null;
}

export function getNearestKoreanAddress(lat: number, lon: number): string {
  let nearestName = '서울특별시';
  let minDistance = Infinity;

  const allLocations = { ...CITY_COORDINATES, ...DISTRICT_COORDINATES };

  for (const [name, coords] of Object.entries(allLocations)) {
    const distance = Math.sqrt(
      Math.pow(coords.lat - lat, 2) + Math.pow(coords.lon - lon, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearestName = name;
    }
  }

  return nearestName;
}
