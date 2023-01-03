// Requiring the module
const reader = require("xlsx");

// Reading our test file
const file = reader.readFile("./File/queueAnalysis.xlsx");

const Dist = require("probability-distributions");
let data = [];

const sheets = file.SheetNames;

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    data.push(res);
  });
}

function mm1ATnSTRate(arrivalTimes, serviceTimes) {
  // Calculate the total number of customers arriving in the given time period
  const totalArrivals = arrivalTimes.length;

  // Calculate the total service time for all customers
  const totalServiceTime = serviceTimes.reduce((sum, t) => sum + t, 0);

  // Calculate the length of the time period
  const timePeriod = arrivalTimes[arrivalTimes.length - 1] - arrivalTimes[0];

  // Calculate arrival rate (lambda)
  const lambda = totalArrivals / timePeriod;

  // Calculate service rate (mu)
  const mu = totalServiceTime / timePeriod;

  // Return the arrival and service rates as an object
  return { lambda, mu };
}

function mm1Measures(lambda, mu) {
  // Calculate average number of customers in the system (L)
  const L = lambda / (mu - lambda);

  // Calculate average number of customers in the queue (Lq)
  const Lq = (lambda * lambda) / (mu * (mu - lambda));

  // Calculate average waiting time in the queue (Wq)
  const Wq = Lq / lambda;

  // Calculate average time in the system (W)
  const W = Wq + 1 / mu;

  // Return the performance measures as an object
  return { L, Lq, Wq, W };
}

function mmcRates(arrivalTimes, serviceTimes, serverCount) {
  // Calculate the total number of customers arriving in the given time period
  const totalArrivals = arrivalTimes.length;

  // Calculate the total service time for all customers
  const totalServiceTime = serviceTimes.reduce((sum, t) => sum + t, 0);

  // Calculate the length of the time period
  const timePeriod = arrivalTimes[arrivalTimes.length - 1] - arrivalTimes[0];

  // Calculate arrival rate (lambda)
  const lambda = totalArrivals / timePeriod;

  // Calculate service rate (mu)
  const mu = totalServiceTime / timePeriod;

  // Return the arrival and service rates as an object
  return { lambda, mu };
}
function mmcMeasures(lambda, mu, serverCount) {
  console.log(serverCount, lambda, mu);
  // Calculate average number of customers in the system (L)
  const L = (lambda * mu) / (mu - lambda * (serverCount - 1));

  // Calculate average number of customers in the queue (Lq)
  const Lq = (lambda * lambda) / (mu * (mu - lambda * (serverCount - 1)));

  // Calculate average waiting time in the queue (Wq)
  const Wq = Lq / lambda;

  // Calculate average time in the system (W)
  const W = Wq + 1 / (serverCount * mu);

  // Return the performance measures as an object
  return { L, Lq, Wq, W };
}

function mg1LamMuVar(arrivalTimes, serviceTimes) {
  // Calculate the total number of customers arriving in the given time period
  const totalArrivals = arrivalTimes.length;

  // Calculate the total service time for all customers
  const totalServiceTime = serviceTimes.reduce((sum, t) => sum + t, 0);

  // Calculate the length of the time period
  const timePeriod = arrivalTimes[arrivalTimes.length - 1] - arrivalTimes[0];

  // Calculate arrival rate (lambda)
  const lambda = totalArrivals / timePeriod;

  // Calculate mean of the service time distribution (mean)
  const mean = totalServiceTime / totalArrivals;
  // Calculate the variance of the service time distribution (variance)
  const variance =
    serviceTimes.reduce((sum, t) => sum + (t - mean) ** 2, 0) /
    serviceTimes.length;

  return { lambda, mean, variance };
}
function mg1Measures(lambda, mean, variance) {
  // Calculate average number of customers in the system (L)
  const L = lambda * mean;

  // Calculate average number of customers in the queue (Lq)
  const Lq = (lambda * lambda * variance) / (2 * mean * (mean - lambda));

  // Calculate average waiting time in the queue (Wq)
  const Wq = Lq / lambda;

  // Calculate average time in the system (W)
  const W = Wq + mean;

  // Return the performance measures as an object
  return { L, Lq, Wq, W };
}

function mgcExtras(arrivalTimes, serviceTimes) {
  // Calculate the total number of customers arriving in the given time period
  const totalArrivals = arrivalTimes.length;

  // Calculate the total service time for all customers
  const totalServiceTime = serviceTimes.reduce((sum, t) => sum + t, 0);

  // Calculate the length of the time period
  const timePeriod = arrivalTimes[arrivalTimes.length - 1] - arrivalTimes[0];

  // Calculate arrival rate (lambda)
  const lambda = totalArrivals / timePeriod;

  // Calculate mean of the service time distribution (mean)
  const mean = totalServiceTime / totalArrivals;

  // Calculate variance of the service time distribution (variance)
  const variance =
    serviceTimes.reduce((sum, t) => sum + (t - mean) ** 2, 0) /
    serviceTimes.length;

  return { lambda, mean, variance };
}
function mgcMeasures(lambda, mean, variance, serverCount) {
  // Calculate average number of customers in the system (L)
  const L = lambda * mean;

  // Calculate average number of customers in the queue (Lq)
  const Lq =
    (lambda * lambda * variance) /
    (2 * mean * (mean - lambda * (serverCount - 1)));

  // Calculate average waiting time in the queue (Wq)
  const Wq = Lq / lambda;

  // Calculate average time in the system (W)
  const W = Wq + mean;

  // Return the performance measures as an object
  return { L, Lq, Wq, W };
}

function gg1Extras(arrivalTimes, serviceTimes) {
  // Calculate the total number of customers arriving in the given time period
  const totalArrivals = arrivalTimes.length;

  // Calculate the total interarrival time for all customers
  const totalInterarrivalTime = arrivalTimes.reduce(
    (sum, t, i) => sum + (i > 0 ? t - arrivalTimes[i - 1] : 0),
    0
  );

  // Calculate the total service time for all customers
  const totalServiceTime = serviceTimes.reduce((sum, t) => sum + t, 0);

  // Calculate the length of the time period
  const timePeriod = arrivalTimes[arrivalTimes.length - 1] - arrivalTimes[0];

  // Calculate arrival rate (lambda)
  const lambda = totalArrivals / timePeriod;

  // Calculate mean of the interarrival time distribution (meanArrival)
  const meanArrival = totalInterarrivalTime / totalArrivals;

  // Calculate variance of the interarrival time distribution (varianceArrival)
  const varianceArrival =
    arrivalTimes.reduce(
      (sum, t, i) =>
        sum + (i > 0 ? (t - arrivalTimes[i - 1] - meanArrival) ** 2 : 0),
      0
    ) / totalArrivals;

  // Calculate mean of the service time distribution (meanService)
  const meanService = totalServiceTime / totalArrivals;

  // Calculate variance of the service time distribution (varianceService)
  const varianceService =
    serviceTimes.reduce((sum, t) => sum + (t - meanService) ** 2, 0) /
    serviceTimes.length;

  // Return lambda, meanArrival, varianceArrival, meanService, and varianceService as an object
  return { lambda, meanArrival, varianceArrival, meanService, varianceService };
}

function gg1Measure(
  lambda,
  meanArrival,
  varianceArrival,
  meanService,
  varianceService
) {
  // Calculate average number of customers in the system (L)
  const L = lambda * meanService;

  // Calculate average number of customers in the queue (Lq)
  const Lq =
    (lambda * lambda * varianceService) /
    (2 * meanService * (meanService - lambda));

  // Calculate average waiting time in the queue (Wq)
  const Wq = Lq / lambda;

  // Calculate average time in the system (W)
  const W = Wq + meanService;

  // Return the performance measures as an object
  return { L, Lq, Wq, W };
}

function ggCExtras(arrivalTimes, serviceTimes) {
  // Calculate the total number of customers arriving in the given time period
  const totalArrivals = arrivalTimes.length;

  // Calculate the total interarrival time for all customers
  const totalInterarrivalTime = arrivalTimes.reduce(
    (sum, t, i) => sum + (i > 0 ? t - arrivalTimes[i - 1] : 0),
    0
  );

  // Calculate the total service time for all customers
  const totalServiceTime = serviceTimes.reduce((sum, t) => sum + t, 0);

  // Calculate the length of the time period
  const timePeriod = arrivalTimes[arrivalTimes.length - 1] - arrivalTimes[0];

  // Calculate arrival rate (lambda)
  const lambda = totalArrivals / timePeriod;

  // Calculate mean of the interarrival time distribution (meanArrival)
  const meanArrival = totalInterarrivalTime / totalArrivals;

  // Calculate variance of the interarrival time distribution (varianceArrival)
  const varianceArrival =
    arrivalTimes.reduce(
      (sum, t, i) =>
        sum + (i > 0 ? (t - arrivalTimes[i - 1] - meanArrival) ** 2 : 0),
      0
    ) / totalArrivals;

  // Calculate mean of the service time distribution (meanService)
  const meanService = totalServiceTime / totalArrivals;

  // Calculate variance of the service time distribution (varianceService)
  const varianceService =
    serviceTimes.reduce((sum, t) => sum + (t - meanService) ** 2, 0) /
    serviceTimes.length;

  // Return lambda, meanArrival, varianceArrival, meanService, and varianceService as an object
  return { lambda, meanArrival, varianceArrival, meanService, varianceService };
}

function ggcMeasures(
  lambda,
  meanArrival,
  varianceArrival,
  meanService,
  varianceService,
  serverCount
) {
  // Calculate average number of customers in the system (L)
  const L = (lambda * meanService) / (serverCount - lambda * meanService);

  // Calculate average number of customers in the queue (Lq)
  const Lq =
    (lambda * lambda * varianceService) /
    (2 *
      serverCount *
      meanService *
      (meanService - lambda * (serverCount - 1)));

  // Calculate average waiting time in the queue (Wq)
  const Wq = Lq / lambda;

  // Calculate average time in the system (W)
  const W = Wq + meanService;

  // Return the performance measures as an object
  return { L, Lq, Wq, W };
}

const poissonDistributions = async (req, res, next) => {
  const arrivalTimes = data.map((d) => d?.["Arrival Time(minute)"]);
  const serviceTimes = data.map((d) => d?.["Service Time(minute)"]);
  console.log(typeof Number(req?.query?.server), typeof Number(req?.query?.at));
  arrivalTimes.push(Number(req?.query?.at));
  serviceTimes.push(Number(req?.query?.st));

  arrivalTimes.sort((a, b) => a - b);
  serviceTimes.sort((a, b) => a - b);
  const { lambda, mu } = mm1ATnSTRate(arrivalTimes, serviceTimes);
  const { lambda: l2, mu: m2 } = mmcRates(
    arrivalTimes,
    serviceTimes,
    Number(req?.query?.server)
  );
  const {
    lambda: l3,
    mean,
    variance,
  } = mg1LamMuVar(arrivalTimes, serviceTimes);
  const {
    lambda: l4,
    mean: me2,
    variance: v2,
  } = mgcExtras(arrivalTimes, serviceTimes);
  const {
    lambda: l5,
    meanArrival,
    varianceArrival,
    meanService,
    varianceService,
  } = gg1Extras(arrivalTimes, serviceTimes);
  const {
    lambda: l6,
    meanArrival: mA2,
    varianceArrival: vA2,
    meanService: mS2,
    varianceService: vS2,
  } = ggCExtras(arrivalTimes, serviceTimes);
  const MM1 = mm1Measures(lambda, mu);
  const MMC = mmcMeasures(l2, m2, Number(req?.query?.server));
  const MG1 = mg1Measures(l3, mean, variance);
  const MGC = mgcMeasures(l4, me2, v2, Number(req?.query?.server));
  const GG1 = gg1Measure(
    l5,
    meanArrival,
    varianceArrival,
    meanService,
    varianceService
  );
  const GGC = ggcMeasures(l6, mA2, vA2, mS2, vS2, Number(req?.query?.server));
  res.json({
    MM1: { ...MM1 },
    MMC: { ...MMC },
    MG1: { ...MG1 },
    MGC: { ...MGC },
    GG1: { ...GG1 },
    GGC: { ...GGC },
  });
};
exports.poissonDistributions = poissonDistributions;
