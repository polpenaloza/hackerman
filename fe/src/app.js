import _ from 'lodash';
import React from 'react';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ReactHighcharts from 'react-highcharts';
import Particles from 'react-particles-js';

// import { spendData, convertionData } from './data-generator';
import background from './assets/images/hackerman.png';
import hackermanPredictions from './json/hackerman_predictions.json';

const { data, labels, title, values } = hackermanPredictions;

const styles = () => ({
  root: {
    flexGrow: 1
  },
  card: {
    display: 'flex',
    marginTop: '10%'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 350
  }
});

const config = {
  title: {
    text: 'CPA Prediction'
  },
  chart: {
    zoomType: 'x'
  },
  xAxis: {
    categories: data.x,
    crosshair: true
  },
  yAxis: [
    {
      title: {
        text: 'CPA'
      },
      opposite: true
    },
    {
      title: {
        text: labels.y
      }
    }
  ],
  series: [
    {
      name: 'CPA',
      data: _.map(data.x, (v, k) => v / data.y[k])
    },
    {
      name: 'Purchases',
      data: data.y,
      yAxis: 1
    }
  ],
  tooltip: {
    crosshairs: [true, true]
  }
};

const particlesConfig = {
  fps_limit: 28,
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 1500
      }
    },
    line_linked: {
      enable: true,
      opacity: 0.1
    },
    move: {
      direction: 'right',
      speed: 2
    },
    size: {
      value: 1
    },
    opacity: {
      anim: {
        enable: true,
        speed: 5,
        opacity_min: 0.05
      }
    }
  },
  retina_detect: true
};

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(8, 6, 17)',
            left: 0,
            top: 0,
            zIndex: -1
          }}
        >
          <Particles params={particlesConfig} />
        </div>
        <Card className={classes.card} raised>
          <CardContent className={classes.content}>
            <Grid item xs>
              <Typography component="h5" variant="h5">
                Hackerman
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {title} - {new Date().toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <ReactHighcharts config={config} />
            </Grid>
            <Grid item xs={12}>
              <Grid container className={classes.demo} justify="center" spacing={40}>
                {_.map(values, (v, k) => (
                  <Grid key={v} item>
                    <Typography variant="h6" gutterBottom align="center">
                      {_.replace(k, /_/g, ' ')}
                    </Typography>
                    <Typography component="h2" variant="display1" gutterBottom align="center">
                      {v}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardMedia className={classes.cover} image={background} title="Live from space album cover" />
        </Card>
      </div>
    );
  }
}

const asd = withStyles(styles)(App);

export default hot(module)(asd);
