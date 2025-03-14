"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { TagsInput } from "@/components/ui/tags-input";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loader from "@/components/Loader";
import { createJobPosting } from "@/lib/api/jobPosting";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  requirements: z.string().min(1),
  location: z.string().min(1),
  salary_min: z.number().min(0).max(10000000),
  salary_max: z.number().min(0).max(10000000),
  employement_type: z.string(),
  tags: z.array(z.string()).nonempty("Please select at least one item"),
  deadline: z.coerce.date(),
});

export default function Page() {
  const employement_types = [
    {
      label: "on-site",
      value: "on-site",
    },
    {
      label: "remote",
      value: "remote",
    },
    {
      label: "hybrid",
      value: "hybrid",
    },
  ] as const;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      employement_type: "on-site",
      location: "",
      salary_min: 0,
      salary_max: 0,
      requirements: "",
      tags: [],
      deadline: new Date(),
    },
  });
  const { session } = useSelector((state: RootState) => state.session);
  if (!session) {
    return <Loader />;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!session) {
        throw new Error("Error: User is not logged in");
      }
      await createJobPosting(session.id, values);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8 border border-gray-700"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-gray-100 text-center"
        >
          Create Job Posting
        </motion.h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {["title", "description", "requirements", "location"].map(
              (fieldName, index) => (
                <motion.div
                  key={fieldName}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FormField
                    control={form.control}
                    name={fieldName as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 capitalize">
                          {fieldName.replace("_", " ")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus-visible:ring-gray-300 focus:border-gray-400"
                            placeholder={`Enter ${fieldName.replace("_", " ")}`}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </motion.div>
              ),
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-6"
            >
              <FormField
                control={form.control}
                name="salary_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Minimum Salary
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-700 border-gray-600 text-gray-100"
                        type="number"
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary_max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Maximum Salary
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-700 border-gray-600 text-gray-100"
                        type="number"
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="employement_type"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-gray-300">
                      Employment Type
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-100",
                              !field.value && "text-gray-400",
                            )}
                          >
                            {field.value || "Select Type"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 text-gray-300" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0 border-gray-600">
                        <Command className="bg-gray-800 border border-gray-600">
                          <CommandInput
                            placeholder="Search Type..."
                            className="text-gray-200"
                          />
                          <CommandList>
                            <CommandEmpty className="text-gray-400 px-2 py-1.5">
                              No Type found.
                            </CommandEmpty>
                            <CommandGroup>
                              {employement_types.map((employment_type) => (
                                <CommandItem
                                  value={employment_type.label}
                                  key={employment_type.value}
                                  onSelect={() => {
                                    form.setValue(
                                      "employement_type",
                                      employment_type.value,
                                    );
                                  }}
                                  className="hover:bg-gray-700 text-gray-200 cursor-pointer"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4 text-gray-300",
                                      employment_type.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {employment_type.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Job Tags</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Add tags..."
                        className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-gray-300">Deadline</FormLabel>
                    <DatetimePicker
                      {...field}
                      format={[
                        ["months", "days", "years"],
                        ["hours", "minutes", "am/pm"],
                      ]}
                      className="bg-gray-700 border-gray-600 text-gray-100"
                      popoverClassName="border-gray-600 bg-gray-800"
                    />
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-6"
            >
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 h-12 text-base font-medium transition-all"
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Posting
                </motion.button>
              </Button>
            </motion.div>
          </form>
        </Form>
      </motion.div>
    </motion.div>
  );
}
