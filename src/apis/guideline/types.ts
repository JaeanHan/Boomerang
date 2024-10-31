export type ProgressType = {
  type_name: string;
};

export type SubStep = {
  name: string;
  content: string;
  completion: boolean;
};

export type ProgressResponse = {
  progress_type: string;
  current_main_step: string;
  main_step_list: string[];
  sub_step_list: SubStep[];
};
