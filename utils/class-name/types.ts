type ClassName = string | null | undefined | Record<string, boolean>;

export type Util = (...classNames: ClassName[]) => string;
