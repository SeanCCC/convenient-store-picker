import * as React from 'react';
import { Button, Breadcrumb, Segment } from 'semantic-ui-react';
const Component = React.Component;

export interface Props {
  storeSearch: any;
  onSelect: Function;
}

interface Option {
  id: string;
  name: string;
}

export interface States {
  stage: number;
  loading: boolean;
  selectedCity: string;
  selectedDist: string;
  selectedStreet: string;
  selectedStore: string;
  storeOptions: Object[];
  cityOptions: Option[];
  distOptions: Option[];
  streetOptions: Option[];
}

class ConvinientStorePicker extends Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderStepper = this.renderStepper.bind(this);
    this.renderBreadcrumb = this.renderBreadcrumb.bind(this);
    this.renderStoreSegment = this.renderStoreSegment.bind(this);
    this.state = {
      stage: 0,
      selectedCity: null,
      selectedDist: null,
      selectedStreet: null,
      selectedStore: null,
      loading: false,
      storeOptions: [],
      cityOptions: [],
      distOptions: [],
      streetOptions: [],
    };
  }

  async componentDidMount() {
    const res = await this.props.storeSearch.listCity();
    this.setState({ cityOptions: res });
  }

  renderBreadcrumb () {
    const { stage, streetOptions, distOptions,
      cityOptions, selectedCity, selectedDist, selectedStreet } = this.state;
    const onClick = (newStage: number) => () => {
      this.setState({ stage: newStage });
    };
    const cityObj = cityOptions.find(c => c.id === selectedCity);
    const cityName = cityObj ? cityObj.name : '';
    const distObj = distOptions.find(d => d.id === selectedDist);
    const distName = distObj ? distObj.name : '';
    const streetObj = streetOptions.find(s => s.id === selectedStreet);
    const streetName = streetObj ? streetObj.name : '';
    return <div>
      <Breadcrumb>
      {stage > 0 ?
        <Breadcrumb.Section onClick = {onClick(0)} >{cityName}</Breadcrumb.Section> : null}
      {stage > 1 ? <Breadcrumb.Divider /> : null}
      {stage > 1 ?
        <Breadcrumb.Section onClick = {onClick(1)} link>{distName}</Breadcrumb.Section> : null}
      {stage > 2 ? <Breadcrumb.Divider /> : null}
      {stage > 2 ?
        <Breadcrumb.Section onClick = {onClick(2)} active>{streetName}</Breadcrumb.Section> : null}
      </Breadcrumb>
    </div>;
  }

  renderStoreSegment = (data: any, onSelect: Function) => (
    <Segment.Group horizontal>
      <Segment className="left-segment">
        <div className="header">{`${data.brand}${data.name}`}</div>
        {`店號：${data.id}`}<br/>{`地址：${data.address}`}<br/>{`電話號碼：${data.phone}`}
      </Segment>
      <Segment textAlign="center" className="right-segment">
        <Button
        color = "teal"
        onClick = {() => {
          onSelect(data);
        }}>
          選擇
        </Button>
      </Segment>
    </Segment.Group>
  )

  async loadDist(cityId: string) {
    const res = await this.props.storeSearch.listDistrict(cityId);
    this.setState({ distOptions: res });
  }

  async loadStreet(districtId: string) {
    const res = await this.props.storeSearch.listStreet(districtId);
    this.setState({ streetOptions: res });
  }

  async loadStore(streetId: string) {
    const res = await this.props.storeSearch.listStore(streetId);
    this.setState({ storeOptions: res });
  }

  renderOptions = (options: any) => {
    const { selectedCity, selectedDist, selectedStreet, stage } = this.state;
    const { onSelect } = this.props;
    let optionsComp;
    if (options === undefined || options.length === 0) {
      optionsComp = <div>
        無符合條件選項
      </div>;
    }
    if (stage === 0) {
      optionsComp = options.map(
        (opt: any, idx: number) =>
          <Button
          className = "option-btn"
          active = {selectedCity === opt.id}
          onClick = {() => {
            this.setState({ selectedCity: opt.id });
          }}
          key={idx}>
            {opt.name}
          </Button>,
      );
    } else if (stage === 1) {
      optionsComp = options.map(
        (opt: any, idx: number) =>
          <Button
          className = "option-btn"
          active = {selectedDist === opt.id}
          onClick = {() => {
            this.setState({ selectedDist: opt.id });
          }}
          key={idx}>
            {opt.name}
          </Button>,
      );
    } else if (stage === 2) {
      optionsComp = options.map(
        (opt: any, idx: number) =>
          <Button
          className = "option-btn"
          active = {selectedStreet === opt.id}
          onClick = {() => {
            this.setState({ selectedStreet: opt.id });
          }}
          key={idx}>
            {opt.name}
          </Button>,
      );
    } else if (stage === 3) {
      optionsComp = options.map(
        (opt: any, idx: number) => {
          return <div key={idx} className="segment-list">
            {this.renderStoreSegment(opt, onSelect)}
          </div>;
        },
      );
    }
    return <div className="options-container">{optionsComp}</div>;
  }

  renderStepper = () => {
    const { stage, selectedCity, selectedStreet, selectedDist, loading } = this.state;
    const leftText = '返回';
    const rightText = '下一步';
    let loader: Function;
    let validInput: boolean;
    switch (stage) {
      case 0:
        loader = async () => { await this.loadDist(selectedCity); };
        validInput = selectedCity !== null;
        break;
      case 1:
        loader = async () => { await this.loadStreet(selectedDist); };
        validInput = selectedDist !== null;
        break;
      case 2:
        loader = async () => { await this.loadStore(selectedStreet); };
        validInput = selectedStreet !== null;
        break;
    }
    return <div className="stepper-container">
      {stage > 0 ? <Button
        floated = "left"
        onClick = {() => {
          this.setState({ stage: stage - 1 });
        }}>
          {leftText}
        </Button> : null}
      {stage < 3 ? <Button
        disabled = {!validInput}
        floated = "right"
        color = "teal"
        loading = {loading}
        onClick = {async () => {
          if (validInput) {
            this.setState({ loading: true });
            await loader();
            this.setState({ stage: stage + 1, loading: false });
          }
        }}>
        {rightText}
      </Button> : null}
    </div>;
  }

  render() {
    const { stage, cityOptions, distOptions, streetOptions, storeOptions } = this.state;
    let options;
    switch (stage) {
      case 0:
        options = cityOptions;
        break;
      case 1:
        options = distOptions;
        break;
      case 2:
        options = streetOptions;
        break;
      case 3:
        options = storeOptions;
        break;
    }
    return (
      <div  className="ConvinientStorePicker">
        {this.renderBreadcrumb()}
        {this.renderOptions(options)}
        {this.renderStepper()}
      </div>
    );
  }
}

export default ConvinientStorePicker;
