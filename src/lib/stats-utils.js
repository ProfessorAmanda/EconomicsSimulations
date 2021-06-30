import { mean, std } from "mathjs";
import PD from "probability-distributions";
import _ from "lodash";

// generates a dataset with normal distribution
// returns an array of {x, y, id}
export const generateNormal = (sampleSize, mean, standardDev) => {
  const population = PD.rnorm(sampleSize, mean, standardDev).map((num) => _.round(num, 1));
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push({x: +amt, y: i})
    }
  });
  return _.shuffle(popArray).map((obj, index) => ({...obj, id: index}));
}

// generates a dataset with uniform distribution
// returns an array of {x, y, id}
export const generateUniform = (sampleSize, low, hi) => {
  const population = PD.runif(sampleSize, low, hi).map((num) => _.round(num, 1));
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push({x: +amt, y: i})
    }
  });
  return _.shuffle(popArray).map((obj, index) => ({...obj, id: index}));
}

// generates a dataset with exponential distribution
// returns an array of {x, y, id}
export const generateExponential = (sampleSize, lambda) => {
  const population = PD.rexp(sampleSize, lambda).map((num) => _.round(num, 1));
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push({x: +amt, y: i})
    }
  });
  return _.shuffle(popArray).map((obj, index) => ({...obj, id: index}));
}

// generates a dataset with chi-squared distribution
// returns an array of {x, y, id}
export const generateChiSquared = (sampleSize, degreesOfFreedom) => {
  const population = PD.rchisq(sampleSize, degreesOfFreedom).map((num) => _.round(num, 1));
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push({x: +amt, y: i})
    }
  });
  return _.shuffle(popArray).map((obj, index) => ({...obj, id: index}));
}

// generates a dataset with 'mystery' distribution (really points sampled randomly from two normal distributions)
// returns an array of {x, y, id}
export const generateMystery = (sampleSize, mysteryMean1, mysteryMean2, mysterySD1, mysterySD2) => {
  const normal1 = PD.rnorm(sampleSize, mysteryMean1, mysterySD1).map((num) => _.round(num, 1));
  const normal2 = PD.rnorm(sampleSize, mysteryMean2, mysterySD2).map((num) => _.round(num, 1));

  const population = _.sampleSize([...normal1, ...normal2], 2000);
  const counts = _.countBy(population);
  const popArray = [];
  _.entries(counts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      popArray.push({x: +amt, y: i})
    }
  });
  return _.shuffle(popArray).map((obj, index) => ({...obj, id: index}));
}

// returns the data set from the function corresponding with distType
// objects in array are of shape {x, y, id}
export const dataFromDistribution = (
    distType,
    sampleSize,
    {
      mean=64,
      standardDev=3,
      low=-10,
      hi=10,
      lambda=1/64,
      degreesOfFreedom=8,
      mysteryMean1=57,
      mysteryMean2=70,
      mysterySD1=1,
      mysterySD2=3
    } = {}
  ) => {

  const getDistributionFunction = {
    "Normal": () => generateNormal(sampleSize, mean, standardDev),
    "Uniform": () => generateUniform(sampleSize, low, hi),
    "Exponential": () => generateExponential(sampleSize, lambda),
    "Chi-Squared": () => generateChiSquared(sampleSize, degreesOfFreedom),
    "Mystery": () => generateMystery(sampleSize, mysteryMean1, mysteryMean2, mysterySD1, mysterySD2)
  }

  return getDistributionFunction[distType]();
}

// returns the mean of popArray
export const populationMean = (popArray) => {
  return (popArray.length > 0) ? mean(popArray.map(p => p.x)) : undefined;
}

// returns the std of popArray
export const populationStandardDev = (popArray) => {
  return (popArray.length > 0) ? std(popArray.map(p => p.x)) : undefined;
}
