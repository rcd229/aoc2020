import { bagRules } from "./bagRules";

export const getBagRules = () => {
  const rules = bagRules.split(/\n/);
  const ruleObj = rules.map(rule => {
    const [container, containees] = rule.replace(/\sbag[s]*[.]*/g,"").split(" contain ");
    const containedBags = containees.split(/,\s*/);

    const cArr = [];

    containedBags.forEach(cb => {
      const [num, adj, color] = cb.split(" ");

      if (adj && color) {
        cArr.push({
          type: `${adj} ${color}`,
          num: num ? parseInt(num) : 0
        });
      }
    });

    return {
      container,
      containees: cArr
    };

  });

  return ruleObj;
}

export const findContainingBags = (bagType, rules, foundContainers) => {
  let containers = rules.filter(rule => rule.containees.map(r => r.type).includes(bagType));

  containers.forEach(c => {
    containers.push(findContainingBags(c.container, rules, containers));
  });

  return [... new Set(containers.flat())];
};

export const findContainedBags = (bagType, rules) => {
  const bag = rules.find(rule => rule.container === bagType);

  if (bag.containees.length) {
    let allBags = 0;

    bag.containees.forEach(containee => {
      allBags = allBags + containee.num + (containee.num * findContainedBags(containee.type, rules));
    });

    return allBags;
  } else {
    return 0;
  }
}
