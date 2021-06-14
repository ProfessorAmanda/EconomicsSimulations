import { mean, sqrt, random, round } from "mathjs";
import PD from "probability-distributions";
import _ from "lodash";

// generates a dataset with normal distribution
// returns an array of [value, count] pairs
export const generateNormal = (sampleSize) => {
  const MEAN = 64;
  const STANDARD_DEV = 3;
  const population = PD.rnorm(sampleSize, MEAN, STANDARD_DEV).map((num) => _.round(num, 1));
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push([amt, i])
    }
  });
  return _.shuffle(popArray);
}

// generates a dataset with uniform distribution
// returns an array of [value, count] pairs
export const generateUniform = (sampleSize) => {
  const HI = 10;
  const LOW = -10;
  const population = PD.runif(sampleSize, LOW, HI).map((num) => _.round(num, 1));
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push([amt, i])
    }
  });
  return _.shuffle(popArray);
}

// generates a dataset with exponential distribution
// returns an array of [value, count] pairs
export const generateExponential = (sampleSize) => {
  const LAMBDA = 1/64;
  const population = PD.rexp(sampleSize, LAMBDA).map((num) => _.round(num, 1));
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push([amt, i])
    }
  });
  return _.shuffle(popArray);
}

// generates a dataset with chi-squared distribution
// returns an array of [value, count] pairs
export const generateChiSquared = (sampleSize) => {
  const DEGREES_OF_FREEDOM = 8;
  const population = PD.rchisq(sampleSize, DEGREES_OF_FREEDOM).map((num) => _.round(num, 1));
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push([amt, i])
    }
  });
  return _.shuffle(popArray);
}

// generates a dataset with 'mystery' distribution
// returns an array of [value, count] pairs
export const generateMystery = (sampleSize) => {

  const popArray = [];

  const firstMEAN = 75.5;
  const firstSTANDARD_DEV = 3;
  const firstITERATES = 9;
  const firstrange = sqrt(12) * firstSTANDARD_DEV * firstSTANDARD_DEV;
  const firstpopMin = firstMEAN - (firstrange / 2);
  const secondMEAN = 60.5;
  const secondSTANDARD_DEV = 2;
  const secondITERATES = 9;
  const secondrange = sqrt(12) * secondSTANDARD_DEV * secondSTANDARD_DEV;
  const secondpopMin = secondMEAN - (secondrange / 2);

  const clearedArray = [];
  const popDict = [];
  const newCleared = clearedArray;
  const stateCopy = popDict;


  for (let i = 0; i < sampleSize/2; i++){
    let sum = 0;
    if(clearedArray.length === 0){
        for (let j = 0; j < firstITERATES; j++){
            sum += random() * firstrange + firstpopMin;
        }
    }
    else{
        sum = newCleared.pop() * firstITERATES;
    }
    if (popDict[round(sum / firstITERATES * 10)]){
        stateCopy[round(sum / firstITERATES * 10)] += 1
    }
    else {
        stateCopy[round(sum / firstITERATES * 10)] = 1
    }
    popArray.push(round((sum / firstITERATES)*100)/100)
  }

  for (let i = 0; i < sampleSize/2; i++){
      let sum = 0;
      if(clearedArray.length === 0){
          for (let j = 0; j < secondITERATES; j++){
              sum += random() * secondrange + secondpopMin;
          }
      }
      else{
          sum = newCleared.pop() * secondITERATES;
      }
      if (popDict[round(sum / secondITERATES * 10)]){
          stateCopy[round(sum / secondITERATES * 10)] += 1
      }
      else {
          stateCopy[round(sum / secondITERATES * 10)] = 1
      }
      popArray.push(round((sum / secondITERATES)*100)/100)
  }
  if(clearedArray.length > 0){
    var tempCleared = clearedArray;
    tempCleared = newCleared;
    this.setState({clearedArray : tempCleared});
  }

  const finalPopArray = [];

  let count = Array(sampleSize).fill(-1);
  for (let i = 0; i < sampleSize; i++){

      let val = popArray[i];

      if (count[round(val * 10)] !== -1){
          count[round(val * 10)] += 1;
      }
      else {
          count[round(val * 10)] = 1;
      }

      finalPopArray.push([(round(val * 10)/10), count[round(val * 10)] ])
  }

  return _.shuffle(finalPopArray);
}


// returns the data set from the function corresponding with distType
export const dataFromDistribution = (distType, sampleSize) => {
  const getDistributionFunction = {
    "Normal": () => generateNormal(sampleSize),
    "Uniform": () => generateUniform(sampleSize),
    "Exponential": () => generateExponential(sampleSize),
    "Chi-Squared": () => generateChiSquared(sampleSize),
    "Mystery": () => generateMystery(sampleSize)
  }

  return getDistributionFunction[distType]();
}

// returns the mean of popArray
export const populationMean = (popArray) => {
  return mean(popArray.map(p => p[0]));
}
