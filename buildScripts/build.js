/* eslint-disable no-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating minified bundle for production. This will take a moment'));

webpack(webpackConfig).run((err, stats)=>{
  if(err)
  {
    //Encountered an error
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors)
  {
    //print errors and return from here itself.
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if(jsonStats.hasWarnings)
  {
    console.log('webpack generated following warnings');
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(`webpack stats: ${stats}`);

  //if we got this far, build is succeeded.
  console.log(chalk.green(`Your app has been built for production and written to /dist!`));

  return 0;
});
