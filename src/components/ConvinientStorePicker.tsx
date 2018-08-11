import * as React from 'react';
import { Promise } from 'es6-promise';
const Component = React.Component;

export interface Props {
  storeSearch: any;
}

export interface States {
  selectedBrand: String;
  selectedCity: String;
  selectedDist: String;
  selectedStreet: String;
  brandOptions: Object[];
  cityOptions: Object[];
  distOptions: Object[];
  streetOptions: Object[];
}

class ConvinientStorePicker extends Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedBrand: '7-11',
      selectedCity: '台北市',
      selectedDist: '松山區',
      selectedStreet: '撫遠街',
      brandOptions: [],
      cityOptions: [],
      distOptions: [],
      streetOptions: [],
    };
  }

  setStateAsync(state: any) {
    return new Promise((resolve: any) => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {
    const cityList =  await this.props.storeSearch.listCity();
    this.setState({
      cityOptions: cityList,
      ...this.state,
    });
  }

  render() {
    return (
      <div>
          123
      </div>
    );
  }
}

export default ConvinientStorePicker;
