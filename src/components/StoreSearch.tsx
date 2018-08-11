interface City {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
}

interface Street {
  id: string;
  name: string;
}

interface Store {
  id: string;
  brand: string; // SEVEN, FAMILY,
  name: string;
  address: string;
  phone: string;
}

interface StoreSearch {
  listCity(): Promise<City[]>;
  listDistrict(cityId: string): Promise<District[]>;
  listStreet(districtId: string): Promise<Street[]>;
  listStore(streetId: string): Promise<Store[]>;
}

export default class MockStoreSearch implements StoreSearch {
  public async listCity() {
    return [{ id: 'taipei', name: '台北' }];
  }

  public async listDistrict(cityId: string) {
    return [{ id: 'shinyi', name: '信義區' }];
  }

  public async listStreet(districtId: string) {
    return [{ id: 'wushin', name: '吳興街' }];
  }

  public async listStore(streetId: string) {
    return [
      {
        id: '149697',
        brand: 'SEVEN',
        name: '三興門市',
        address: '台北市信義區吳興街156巷2弄2號4號1樓',
        phone: '(02)27335027',
      },
    ];
  }
}
