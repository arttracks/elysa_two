function classified_as(submittedResource, requestedClassification) {
  let results = [];
  let resourceArray = submittedResource;

  if (Object.prototype.toString.call(submittedResource) == "[object Object]") {
    resourceArray = [submittedResource];
  }

  if (resourceArray  && resourceArray.length) {
    for (const resource of resourceArray) {
      if (
        !resource.classified_as ||
        !Array.isArray(resource.classified_as) ||
        !resource.classified_as.length
      ) {
        continue;
      }
      for (const classification of resource.classified_as) {
        if (!classification.id) {
          continue;
        }
        if (classification.id === requestedClassification) {
          results.push(resource)
        } 
      }
    }
  }
  return results;
}

export { classified_as };
