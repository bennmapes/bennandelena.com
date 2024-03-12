import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import awkwardGif from "../assets/awkward-blonde.gif";
import yesGif from "../assets/yes.gif";
import sadGif from "../assets/sad.gif";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { DeleteIcon, PlusIcon } from "lucide-react";
/**
 * TODO:
 * 1. Checkbox for
 *  */
interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  comments: HTMLTextAreaElement;
}

interface RSVPFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type PeopleData = {
  first_name?: string;
  last_name?: string;
  camping_friday?: boolean;
  camping_saturday?: boolean;
  dietary_restrictions?: string;
  comments?: string;
};

export function RSVP({ ...props }) {
  const [responseValue, setResponseValue] = useState<string | undefined>(
    undefined
  );

  const [peopleValues, setPeopleValues] = useState<PeopleData[]>([]);
  const [open, setOpen] = useState(false);

  const updatePeopleData = (value: Partial<PeopleData>, index: number) => {
    const newPeopleData = [...peopleValues];
    newPeopleData[index] = { ...newPeopleData[index], ...value };
    setPeopleValues(newPeopleData);
    console.log(newPeopleData);
  };

  const webAppUrl =
    "https://script.google.com/macros/s/AKfycbwapD-zECJmUoLZO6tQ8-faY7mf-DaB9NBV_54vrlRrTOfSxLjN4qdbQ-1buaK9bZMY/exec";

  const handleRSPVSubmit = (event: React.FormEvent<RSVPFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const email = event.currentTarget.elements.email.value;
    const comments = event.currentTarget.elements.comments.value;
    formData.append("Email", email);
    formData.append("Comments", comments);
    formData.append("Response", responseValue || "No Response");
    formData.append("PeopleData", JSON.stringify(peopleValues));
    console.log("Form Data", formData);
    setOpen(!open);
    return fetch(webAppUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(response);
        setPeopleValues([]);
        setResponseValue(undefined);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const repeatableSection = () => {
    return (
      <>
        {peopleValues.map((personData, index) => {
          return (
            <div className="mt-5 mb-5 border p-2 rounded" key={index}>
              <div className="flex items-center space-x-2 mb-5">
                <Input
                  id="first_name"
                  type="first_name"
                  placeholder="First Name"
                  value={personData.first_name}
                  onChange={(e) =>
                    updatePeopleData({ first_name: e.target.value }, index)
                  }
                />
                <Input
                  id="last_name"
                  type="last_name"
                  placeholder="Last Name"
                  value={personData.last_name}
                  onChange={(e) =>
                    updatePeopleData({ last_name: e.target.value }, index)
                  }
                />
              </div>
              <div className="flex items-center space-x-2 mb-5">
                <Checkbox
                  id="camping_friday"
                  defaultChecked={personData.camping_friday ?? false}
                  onCheckedChange={(checked) =>
                    updatePeopleData(
                      {
                        camping_friday:
                          !checked || checked === "indeterminate"
                            ? false
                            : true,
                      },
                      index
                    )
                  }
                />
                <label
                  htmlFor="camping_friday"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Camping Friday Night
                </label>
              </div>
              <div className="flex items-center space-x-2 mb-5">
                <Checkbox
                  id="camping_saturday"
                  defaultChecked={personData.camping_saturday ?? false}
                  onCheckedChange={(checked) =>
                    updatePeopleData(
                      {
                        camping_saturday:
                          !checked || checked === "indeterminate"
                            ? false
                            : true,
                      },
                      index
                    )
                  }
                />
                <label
                  htmlFor="camping_saturday"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Camping Saturday Night
                </label>
              </div>
              <Textarea
                placeholder="Dietary restrictions"
                className="mb-5"
                value={personData.dietary_restrictions}
                onChange={(e) =>
                  updatePeopleData(
                    { dietary_restrictions: e.target.value },
                    index
                  )
                }
              />
              {index !== 0 && (
                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      const newPeopleData = [...peopleValues];
                      newPeopleData.splice(index, 1);
                      setPeopleValues([...newPeopleData]);
                    }}
                    type="button"
                  >
                    <DeleteIcon className="mr-2 h-4 w-4" /> Remove Guest
                  </Button>
                </div>
              )}
            </div>
          );
        })}
        {(responseValue === "Gladly Accepts" ||
          responseValue === "Regretfully Accepts") && (
          <div className="flex justify-start">
            <Button
              onClick={() => {
                setPeopleValues([...peopleValues, {}]);
              }}
              type="button"
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add Guest
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <div {...props}>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <DialogTrigger
          className={buttonVariants({ variant: "outline" })}
          onClick={() => setOpen(!open)}
        >
          RSVP Here!
        </DialogTrigger>
        <DialogContent
          className={
            "lg:max-w-screen-lg overflow-y-scroll max-h-screen no-scrollbar"
          }
        >
          <DialogHeader>
            <DialogTitle>Can't wait to hear from you!</DialogTitle>
          </DialogHeader>
          <form id="rsvp-form" onSubmit={handleRSPVSubmit}>
            {/* Set Id to "response" */}
            <Select
              onValueChange={(event) => {
                setResponseValue(event);
                if (
                  event === "Gladly Declines" ||
                  event === "Regretfully Declines"
                ) {
                  setPeopleValues([]);
                } else if (peopleValues.length === 0) {
                  setPeopleValues([{}]);
                }
              }}
            >
              <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="Select a response" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Response</SelectLabel>
                  <SelectItem value="Regrefully Accepts">
                    Regrefully Accept
                  </SelectItem>
                  <SelectItem value="Gladly Accepts">Gladly Accept</SelectItem>
                  <SelectItem value="Regretfully Declines">
                    Regretfully Decline
                  </SelectItem>
                  <SelectItem value="Gladly Declines">
                    Gladly Decline
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {(responseValue === "Gladly Declines" ||
              responseValue === "Regrefully Accepts") && (
              <img
                src={awkwardGif}
                alt="awkward"
                className="max-w-sm mx-auto pt-5"
              />
            )}
            {responseValue === "Gladly Accepts" && (
              <img src={yesGif} alt="yes" className="max-w-sm mx-auto pt-5" />
            )}
            {responseValue === "Regretfully Declines" && (
              <img src={sadGif} alt="sad" className="max-w-sm mx-auto pt-5" />
            )}
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="mb-5 mt-5"
            />
            {repeatableSection()}
            <Textarea
              id="comments"
              placeholder="Do you have any questions or secret messages?"
              className="mb-5 mt-5"
            />
            <div className="flex flex-col items-center">
              <Button type="submit" className="">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
