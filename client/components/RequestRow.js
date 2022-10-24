import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../utils/web3';
import Campaign from '../utils/campaign';

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address);

    // const accounts = await web3.eth.getAccounts();
    const account = '0x34c93F7B17B60D84eF6f2606296bb869d827E0B6';
    await campaign.methods.approveRequest(this.props.id).send({
      from: account
    });
  };

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);

    // const accounts = await web3.eth.getAccounts();
    const account = '0x34c93F7B17B60D84eF6f2606296bb869d827E0B6';
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: account
    });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
