import { IReferenceObject, newObject } from "./referenceObject";

/**
 * Gets a ReferenceObject from an element.
 *
 * @param el the element to get a reference object from
 */
export const getClassReferences = (el: HTMLElement) => {
  return ((el.dataset.classReferences &&
    JSON.parse(el.dataset.classReferences)) ||
    newObject()) as IReferenceObject;
};

/**
 * Sets the class references for an element.
 *
 * @param el the element to set a reference object on
 * @param classReferences the references to set
 */
export const setClassReferences = (
  el: HTMLElement,
  classReferences: IReferenceObject
) => {
  el.dataset.classReferences = JSON.stringify(classReferences);
};
