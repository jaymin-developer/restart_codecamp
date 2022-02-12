import FunctionalComponentUI from "./FunctionalComponent.presenter";

export default function FunctionalComponent() {
  return (
    //   <div>{FunctionalComponentUI({ count: 500 })}</div>;
    <FunctionalComponentUI count={2000} />
  );
}
