import * as React from 'react';
const Component = React.Component;

export interface Props {
  storeSearch: any;
}

export interface States {
  stage: Number;
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
      stage: 0,
      selectedCity: null,
      selectedDist: null,
      selectedStreet: null,
      brandOptions: [],
      cityOptions: [],
      distOptions: [],
      streetOptions: [],
    };
  }

  async componentDidMount() {
    const cityList =  await this.props.storeSearch.listCity()
    .then(
      (res:any) => {
        console.log({ res });
        this.setState({ cityOptions: res });
        return res;
      },
    );
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
