import * as React from 'react';
import ConvinientStorePicker from './ConvinientStorePicker';
import StoreSearch from './StoreSearch';
const Component = React.Component;

class Home extends Component {
  constructor(props: any) {
  	super(props);
  }

  render() {
    const storeSearch = new StoreSearch();
    return (
      <ConvinientStorePicker
        storeSearch={storeSearch}
        onSelect={
          (data:any) => {
            console.log({ data });
          }
        }
      />
    );
  }
}

export default Home;
