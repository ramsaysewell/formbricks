"use client";

import { Label } from "@formbricks/ui";
import { Switch } from "@formbricks/ui";
import { getQuestionTypeName } from "@/lib/questions";
import { cn } from "@formbricks/lib/cn";
import type { Question } from "@formbricks/types/questions";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Draggable } from "react-beautiful-dnd";
import MultipleChoiceSingleForm from "./MultipleChoiceSingleForm";
import OpenQuestionForm from "./OpenQuestionForm";
import QuestionDropdown from "./QuestionDropdown";

interface QuestionCardProps {
  question: Question;
  questionIdx: number;
  updateQuestion: (questionIdx: number, updatedAttributes: any) => void;
  deleteQuestion: (questionIdx: number) => void;
  activeQuestionId: string | null;
  setActiveQuestionId: (questionId: string | null) => void;
  lastQuestion: boolean;
}

export default function QuestionCard({
  question,
  questionIdx,
  updateQuestion,
  deleteQuestion,
  activeQuestionId,
  setActiveQuestionId,
  lastQuestion,
}: QuestionCardProps) {
  const open = activeQuestionId === question.id;
  return (
    <Draggable draggableId={question.id} index={questionIdx}>
      {(provided) => (
        <div
          className={cn(
            open ? "scale-100 shadow-lg" : "scale-97 shadow-md",
            "flex flex-row rounded-lg bg-white transition-all duration-300 ease-in-out"
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <div
            className={cn(
              open ? "bg-slate-700" : "bg-slate-400",
              "top-0 w-10 cursor-move rounded-l-lg p-2 text-center text-sm text-white hover:bg-slate-600"
            )}>
            {questionIdx + 1}
          </div>
          <Collapsible.Root
            open={open}
            onOpenChange={(open) => {
              setActiveQuestionId(open ? question.id : null);
            }}
            className="flex-1 rounded-r-lg border border-slate-200">
            <Collapsible.CollapsibleTrigger
              asChild
              className="flex cursor-pointer justify-between p-4 hover:bg-slate-50">
              <div>
                <div className="inline-flex">
                  <Bars3BottomLeftIcon className="-ml-0.5 mr-2 h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-semibold">
                      {question.headline || getQuestionTypeName(question.type)}
                    </p>
                    {!open && question?.required && (
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {question?.required && "Required"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {open && (
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="required-toggle">Required</Label>
                      <Switch
                        id="required-toggle"
                        checked={question.required}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuestion(questionIdx, { required: !question.required });
                        }}
                      />
                    </div>
                  )}
                  <QuestionDropdown deleteQuestion={deleteQuestion} questionIdx={questionIdx} />
                </div>
              </div>
            </Collapsible.CollapsibleTrigger>
            <Collapsible.CollapsibleContent className="px-4 pb-4">
              {question.type === "openText" ? (
                <OpenQuestionForm
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  lastQuestion={lastQuestion}
                />
              ) : question.type === "multipleChoiceSingle" ? (
                <MultipleChoiceSingleForm
                  question={question}
                  questionIdx={questionIdx}
                  updateQuestion={updateQuestion}
                  lastQuestion={lastQuestion}
                />
              ) : null}
            </Collapsible.CollapsibleContent>
          </Collapsible.Root>
        </div>
      )}
    </Draggable>
  );
}
