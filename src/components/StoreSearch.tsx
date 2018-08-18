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

const waitPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => { resolve(`success`); }, 500);
  });
};

export default class MockStoreSearch implements StoreSearch {
  public async listCity() {
    await waitPromise();
    return [
      { id: 'taipei', name: '台北' },
      { id: 'yilan', name: '宜蘭' },
      { id: 'tainan', name: '台南' },
      { id: 'hsinchu', name: '新竹' },
      { id: 'taitung', name: '台東' },
      { id: 'pingtung', name: '屏東' },
      { id: '1taipei', name: '1台北' },
      { id: '1yilan', name: '1宜蘭' },
      { id: '1tainan', name: '1台南' },
      { id: '1hsinchu', name: '1新竹' },
      { id: '1taitung', name: '1台東' },
      { id: '1pingtung', name: '1屏東' },
    ];
  }

  public async listDistrict(cityId: string) {
    await waitPromise();
    return [{ id: 'shinyi', name: '信義區' }];
  }

  public async listStreet(districtId: string) {
    await waitPromise();
    return [{ id: 'wushin', name: '吳興街' }];
  }

  public async listStore(streetId: string) {
    await waitPromise();
    return [
      {
        id: '149697',
        brand: 'SEVEN',
        name: '三興門市',
        address: '台北市信義區吳興街156巷2弄2號4號1樓',
        phone: '(02)27335027',
      },{
        id: '149697',
        brand: 'SEVEN',
        name: '三興門市',
        address: '台北市信義區吳興街156巷2弄2號4號1樓',
        phone: '(02)27335027',
      },{
        id: '149697',
        brand: 'SEVEN',
        name: '三興門市',
        address: '台北市信義區吳興街156巷2弄2號4號1樓',
        phone: '(02)27335027',
      },
    ];
  }
}
