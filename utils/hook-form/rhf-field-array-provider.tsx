import { createContext, ReactNode, useContext } from "react";
import {
  useFieldArray,
  UseFieldArrayProps,
  UseFieldArrayReturn,
  FieldValues,
} from "react-hook-form";

interface IRHFFieldArrayProvider extends UseFieldArrayProps {
  children: ReactNode;
}

const Context = createContext<UseFieldArrayReturn | null>(null);
export const useRHFFieldArrayContext = <T extends FieldValues>() =>
  useContext(Context) as UseFieldArrayReturn<T>;

const RHFFieldArrayProvider = ({
  children,
  ...props
}: IRHFFieldArrayProvider) => {
  const field = useFieldArray(props);

  return <Context.Provider value={field}>{children}</Context.Provider>;
};

export default RHFFieldArrayProvider;
