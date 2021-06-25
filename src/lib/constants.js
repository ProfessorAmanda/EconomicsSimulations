export const SAMPLE_SIZE = 2000;

export const VALUES = {
  Normal: { xmaxval: 74, xminval: 56, ymaxval: 40, title: "Milk Production", xLabel: "Gallons" },
  Uniform: { xmaxval: 10, xminval: -10, ymaxval: 25, title: "Lottery Outcome", xLabel: "Dollars"},
  Exponential: { xmaxval: 400, xminval: 0, ymaxval: 10, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
  "Chi-Squared": {xmaxval: 25, xminval: 0, ymaxval: 40, title: "Money Spent on Lunch", xLabel: "Dollars"},
  Mystery: { xmaxval: 80, xminval: 50, ymaxval: 40, title:"Alien Female Height", xLabel: "Height (in)"}
}

export const VALUES_ALT = {
  Normal: { xmaxval: 74, xminval: 56, title: "Milk Production", xLabel: "Gallons" },
  Uniform: { xmaxval: 74, xminval: 56, title: "Alien Female Height", xLabel: "Height (in)"},
  Exponential: { xmaxval: 400, xminval: 0, title: "Duration of Telemarketer Call", xLabel: "Duration (seconds)"},
  "Chi-Squared": {xmaxval: 25, xminval: 0, title: "Money Spent on Lunch", xLabel: "Dollars"}
}

export const TEXTS = {
  Normal: ["monthly Milk Production", "cows","produced", " gallons a month."],
  //Uniform: ['the wait time', 'people at the DMV in VT', "reported a total time of", " minutes."],
  Exponential: ["duration", "Telemarketer Calls","reported a duration of", " seconds on a call."],
  "Chi-Squared": ["expenditure", "workers on lunch","reported an expenditure of"," dollars on lunch."],
  Mystery: ['the height', 'Alien Females from planet Stata', "reported a height of", " inches."],
}

export const TEXTS_ALT = {
  Normal: ["monthly Milk Production", "cows"],
  Uniform: ['the height', 'Alien Females from planet Stata'],
  Exponential: ["duration", "Telemarketer Calls"],
  "Chi-Squared": ["expenditure", "workers on lunch"]
}

export const HYPOTHESIS_OPTIONS = {
  oneSample: [
    {
      type: "≤",
      hypoText: "Option 1: These cows produce more than ",
      nullH: "H_0: μ ≤  ",
      alterH: "H_a: μ >  ",
      tails: 1
    },
    {
      type: "≥",
      hypoText: "Option 2: These cows produce less than " ,
      nullH: "H_0: μ ≥  ",
      alterH: "H_a: μ <  ",
      tails: 1
    },
    {
      type: "=",
      hypoText: "Option 3: These cows produce an amount not equal to ",
      nullH: "H_0: μ =  ",
      alterH: "H_a: μ ≠  ",
      tails: 2
    }
  ],
  twoSample: [
    {
      hypoText: "Option 1: These cows produce more than they did before.",
      nullH: "H_0: μ_1 - μ_2 ≥ 0",
      alterH: "H_a: μ_1 - μ_2 < 0",
      tails: 1
    },
    {
      hypoText: "Option 2: These cows produce less than they did before",
      nullH: "H_0: μ_1 - μ_2 ≤ 0",
      alterH: "H_a: μ_1 - μ_2 > 0",
      tails: 1
    },
    {
      hypoText: "Option 3: These cows produce a different amount now compared to before.",
      nullH: "H_0: μ_1 - μ_2 = 0",
      alterH: "H_a: μ_1 - μ_2 ≠ 0",
      tails: 2
    }
  ]
}

export const MODULES = [
  {
    name: 'Law of Large Numbers',
    description: 'The Law of Large Numbers tells us that that the sample mean approaches the mean of the population as we increase the sample size. This simulation investigates the behavior of the sample mean as we change the sample size.',
  },
  {
    name: "Central Limit Theorem",
    description: "The Central Limit Theorem states that, for sufficiently large samples, the sample mean is approximately normally distributed, even if the underlying population is not normally distributed (or if we have no idea what the underlying population looks like). This simulation investigates how the distribution of the sample mean is affected by the sample size and the shape of the population distribution.",
  },
  {
    name: "Joint Distributions",
    description: "A joint probability distribution describes the simultaneous behavior of two random variables.",
  },
  {
    name: "Least Squares",
    description: "Ordinary least squares regression estimates the slope(s) and intercept of a line to best fit data for two (or more) variables by minimizing the sum of the squared distances from the data points to the line.",
  },
  {
    name: "Omitted Variable Bias",
    description: "Omitted variable bias (OVB) arises when a variable that is i) correlated with the outcome and ii) correlated with one on the included regressors is omitted from the regression model.",
  },
  {
    name: "Confidence Intervals",
    description: "A confidence interval provides a range of values for the likely location of the true population mean, based on information gathered from a sample.",
  },
  // {
  //   name: "Hypothesis Testing",
  //   description: "Hypothesis testing is a procedure that allows us to form conclusions based on information derived from a sample.",
  // }
];
