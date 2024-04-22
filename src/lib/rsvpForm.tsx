import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { DeleteIcon, Loader2, PlusIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import awkwardGif from "../assets/awkward-blonde.gif";
import yesGif from "../assets/yes.gif";
import sadGif from "../assets/sad.gif";
import { useEffect, useState } from "react";
import { AccomidationsInfo } from "./accomidationsInfo";

const guestDataSchema = z.object({
  first_name: z.string().min(1, {
    message: "If you don't like your first name, just make one up!",
  }),
  last_name: z
    .string()
    .min(1, { message: "If you don't like your last name, just make one up!" }),
  dinner_friday: z.boolean().default(false).optional(),
  camping_saturday: z.boolean().default(false).optional(),
  sunday_brunch: z.boolean().default(false).optional(),
  dietary_restrictions: z.string().default("").optional(),
});

const formSchema = z.object({
  Response: z
    .string({ required_error: "Please select a response." })
    .min(1, { message: "Please select a response." }),
  Email: z
    .string({
      required_error: "Please give an email so we know who you are.",
    })
    .email(),
  GuestData: z.array(guestDataSchema).default([]),
  Comments: z.string().default(""),
});

const enum Rsvp {
  GladlyAccepts = "Gladly Accepts",
  RegretfullyAccepts = "Regretfully Accepts",
  GladlyDeclines = "Gladly Declines",
  RegretfullyDeclines = "Regretfully Declines",
}

type RSVPFormProps = React.HTMLAttributes<HTMLDivElement> & {
  onSubmitSuccess(response: Response): void;
};

export function RSVPForm({ onSubmitSuccess, ...props }: RSVPFormProps) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [guestAccepeted, setGuestAccepted] = useState(false);

  // Set in GitHub Environments
  const webAppUrl = `${import.meta.env.VITE_GITHUB_APP_SCRIPT_URL}`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      GuestData: [],
      Comments: "",
    },
  });
  const watchResponse = form.watch("Response");

  useEffect(() => {
    form.watch((data, { name }) => {
      if (name === "Response") {
        if (
          (data.Response === Rsvp.GladlyDeclines ||
            data.Response === Rsvp.RegretfullyDeclines) &&
          guestAccepeted
        ) {
          setGuestAccepted(false);
          if (data.GuestData?.length ?? 0 > 0) {
            clearGuestList();
          }
        } else if (
          (data.Response === Rsvp.GladlyAccepts ||
            data.Response === Rsvp.RegretfullyAccepts) &&
          !guestAccepeted
        ) {
          if (data.GuestData?.length === 0) {
            appendGuest({ first_name: "", last_name: "" });
          }
          setGuestAccepted(true);
        }
      }
    });
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const data = new FormData();

    for (const [key, value] of Object.entries(values)) {
      if (Array.isArray(value)) {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    }
    return fetch(webAppUrl, {
      method: "POST",
      body: data,
    })
      .then((response) => {
        onSubmitSuccess(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const {
    fields: guestFields,
    append: appendGuest,
    remove: removeGuest,
  } = useFieldArray({
    control: form.control,
    name: "GuestData",
  });

  const clearGuestList = () => {
    for (let i = guestFields.length - 1; i >= 0; i--) {
      removeGuest(i);
    }
  };

  return (
    <div {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Response"
            render={({ field }) => (
              <FormItem {...field}>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px] ">
                      <SelectValue placeholder="Select a response" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Response</SelectLabel>
                        <SelectItem value={Rsvp.GladlyAccepts}>
                          Gladly Accept
                        </SelectItem>
                        <SelectItem value={Rsvp.RegretfullyAccepts}>
                          Regretfully Accept
                        </SelectItem>
                        <SelectItem value={Rsvp.GladlyDeclines}>
                          Gladly Decline
                        </SelectItem>
                        <SelectItem value={Rsvp.RegretfullyDeclines}>
                          Regretfully Decline
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {(watchResponse === Rsvp.GladlyDeclines ||
            watchResponse === Rsvp.RegretfullyAccepts) && (
            <img
              src={awkwardGif}
              alt="awkward"
              className="max-w-sm mx-auto pt-3"
            />
          )}
          {watchResponse === Rsvp.GladlyAccepts && (
            <img src={yesGif} alt="yes" className="max-w-sm mx-auto pt-3" />
          )}
          {watchResponse === Rsvp.RegretfullyDeclines && (
            <img src={sadGif} alt="sad" className="max-w-sm mx-auto pt-3" />
          )}
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {guestAccepeted &&
            guestFields.map((item, index) => (
              <div className="mt-5 mb-5 border p-2 rounded" key={item.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`GuestData.${index}.first_name`}
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>First Name</FormLabel> */}
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`GuestData.${index}.last_name`}
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Last Name</FormLabel> */}
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <h4 className="text-md font-bold pt-2 pb-2">
                  Let us know what your plan is!
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name={`GuestData.${index}.camping_saturday`}
                    render={({ field }) => (
                      <FormItem>
                        <Checkbox
                          className="mr-2 align-middle"
                          onCheckedChange={(checked) => field.onChange(checked)}
                          checked={field.value}
                        />

                        <FormControl>
                          <FormLabel>Staying at the farm</FormLabel>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch(`GuestData.${index}.camping_saturday`) && (
                    <div className="p-2">
                      <AccomidationsInfo buttonText="Read more here, and reserve a spot!" />
                    </div>
                  )}
                  <FormField
                    control={form.control}
                    name={`GuestData.${index}.dinner_friday`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            className="mr-2 align-middle"
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                            }}
                            checked={field.value}
                          />
                        </FormControl>
                        <FormLabel>Welcome Dinner (Friday)</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`GuestData.${index}.sunday_brunch`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            className="mr-2 align-middle"
                            onCheckedChange={(checked) =>
                              field.onChange(checked)
                            }
                            checked={field.value}
                            defaultChecked={field.value}
                          />
                        </FormControl>
                        <FormLabel>Sunday Brunch</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`GuestData.${index}.dietary_restrictions`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Dietary restrictions"
                          className="mb-5 mt-5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                {index !== 0 && (
                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        removeGuest(index);
                      }}
                      type="button"
                    >
                      <DeleteIcon className="mr-2 h-4 w-4" /> Remove Guest
                    </Button>
                  </div>
                )}
              </div>
            ))}
          {guestAccepeted && (
            <div className="flex justify-start">
              <Button
                onClick={() => {
                  appendGuest({ first_name: "", last_name: "" });
                }}
                type="button"
              >
                <PlusIcon className="mr-2 h-4 w-4" /> Add Guest
              </Button>
            </div>
          )}

          <FormField
            control={form.control}
            name={`Comments`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Do you have any questions or secret messages?"
                    className="mb-5 mt-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {isSubmitting && (
            <Button type="submit" disabled>
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submit
            </Button>
          )}
          {!isSubmitting && <Button type="submit">Submit</Button>}
          {/* </form> */}
        </form>
      </Form>
    </div>
  );
}
