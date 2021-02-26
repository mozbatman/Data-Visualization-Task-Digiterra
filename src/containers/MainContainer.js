import React, { Component } from "react";
import mqtt from 'mqtt';
import moment from 'moment';
import PieChart from "../components/pieChart";
import LineChart from "../components/lineChart";
import NumericalChart from "../components/numericalChart";

// import Chart from "react-apexcharts";
// import { Pie, Line } from 'react-chartjs-2';
// import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official';

var KEY = '../helpers/tls-key.pem';
var CERT = '../helpers/tls-cert.pem';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        connectionStatus: false,
        statuse: false,
        messages: [],
        clientStatuse:{
          labels: [
            'Connected',
            'Disconnected',
          ],
          datasets: [{
            data: [50, 50],
            backgroundColor: [
            '#36A2EB',
            '#FFCE56'
            ],
          }]
        },
        subscriptions:{
          labels: ["00.00.00 PM"],
          datasets: [
            {
              label: 'Active Subscriptions',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0]
            }
          ]
        },
        packetsSend:{
          labels: ["00.00.00 PM"],
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'value',
              },
              ticks: {
                max: 30,
                min: -30
              }
            }]
        },
          datasets: [
            {
              label: 'Packets Send',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0]
            },
            {
              label: 'Packets Received',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,100,192,0.4)',
              borderColor: 'rgba(75,100,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0]
            }
          ]
        },
        bytesSend:{
          labels: ["00.00.00 PM"],
          datasets: [
            {
              label: 'Send Bytes',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0]
            },
            {
              label: 'Received Bytes',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,100,192,0.4)',
              borderColor: 'rgba(75,100,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0]
            }
          ]
        },
        messagesSend:{
          labels: ["00.00.00 PM"],
          datasets: [
            {
              label: 'Send Message',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0]
            },
            {
              label: 'Dropped Message',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,100,192,0.4)',
              borderColor: 'rgba(75,100,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0]
            },
            {
              label: 'Received Message',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,100,100,0.4)',
              borderColor: 'rgba(75,100,100,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0]
            }
          ]
        },
        client:{
          labels: ["00.00.00 PM"],
          datasets: [
            {
              label: 'Maximum connected client',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0]
            },
            {
              label: 'Current connected client',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,100,192,0.4)',
              borderColor: 'rgba(75,100,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0]
            },
            {
              label: 'Rejected',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,100,100,0.4)',
              borderColor: 'rgba(75,100,100,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [0]
            }
          ]
        },
        retainedMessages: 0,
        pendingMessages: 0,
    }
  }

  componentDidMount() {
    var options = {
        port: 8083,
        key: KEY,
        cert: CERT,
        clientId: "digiterra-coding-task-1",
        rejectUnauthorized: false
      }
    const client = mqtt.connect("ws://mqtttest.connio.cloud:8083/mqtt", options);
    client.subscribe('$SYS');
    client.on('connect', () => this.setState({ connectionStatus : true }, () => {console.log("Ok")}));
    client.on('message', (topic, payload, packet) => {
        let data = JSON.parse(payload.toString());

        //Client Statuse
        let clientStatuse = this.state.clientStatuse;
        clientStatuse.datasets[0].data = [data.connected, data.disconnected]

        // Active Subscription Data
        let subscription = this.state.subscriptions;
        let date = moment().format('LTS');
        subscription.datasets[0].data.push(data.activeSubscriptions);
        subscription.labels.push(date);

        // Packet Data
        let packetSend = this.state.packetsSend;
        packetSend.datasets[0].data.push(data.packetSend);
        packetSend.datasets[1].data.push(data.packetReceived);
        packetSend.labels.push(date);

        // Bytes Data
        let bytesSend = this.state.bytesSend;
        bytesSend.datasets[0].data.push(data.messageBytesSent);
        bytesSend.datasets[1].data.push(data.messageBytesReceived);
        bytesSend.labels.push(date);

        // Message Data
        let messagesSend = this.state.messagesSend;
        messagesSend.datasets[0].data.push(data.messageSent);
        messagesSend.datasets[1].data.push(data.messageDropped);
        messagesSend.datasets[2].data.push(data.messageReceived);
        messagesSend.labels.push(date);

        // Client Data
        let client = this.state.client;
        client.datasets[0].data.push(data.maxConnected);
        client.datasets[1].data.push(data.connected);
        client.datasets[2].data.push(data.rejected);
        client.labels.push(date);

        this.setState(prevState =>{
          return{
               ...prevState,
               messages: [...prevState.messages, data],
               clientStatuse: clientStatuse,
               subscriptions: subscription,
               packetsSend: packetSend,
               bytesSend: bytesSend,
               messagesSend: messagesSend,
               client: client
          }
       })
    });
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    return (
      <div className="main-container">
        <PieChart clientStatuse={this.state.clientStatuse}/>
        <div>
          <NumericalChart title="Retained Messages" data={this.state.retainedMessages}/>
          <NumericalChart  title="Pending Messages" data={this.state.pendingMessages}/>
        </div>
        <LineChart data={this.state.subscriptions}/>
        <LineChart data={this.state.packetsSend}/>
        <LineChart data={this.state.bytesSend}/>
        <LineChart data={this.state.messagesSend}/>
        <LineChart data={this.state.client}/>  
      </div>
    );
  }
}

export default MainContainer;