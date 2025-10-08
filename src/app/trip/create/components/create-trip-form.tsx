"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, X } from "lucide-react";
import { NumericFormat } from "react-number-format";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { CreateTrip } from "@/actions/trip/create-trip";
import { toast } from "sonner";

const formSchema = z.object({
  destination: z.string().trim().min(1, "Destino obrigatório"),
  budget: z.number().min(1, "Orçamento obrigatório"),
  startDate: z.date(),
  endDate: z.date(),
  interest: z.array(z.string()).min(1, "Interesses obrigatórios"),
});

const CreateTripFormComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 0,
      startDate: undefined,
      endDate: undefined,
      destination: "",
      interest: [],
    },
  });

  function handleAddInterest(
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldValue: string,
    currentInterests: string[],
    onChange: (val: string[]) => void
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = fieldValue.trim();
      if (!trimmed) return;

      const exists = currentInterests.some(
        (interest) => interest.toLowerCase() === trimmed.toLowerCase()
      );
      if (!exists) {
        onChange([...currentInterests, trimmed]);
      }
      e.currentTarget.value = "";
    }
  }

  function handleRemoveInterest(
    index: number,
    currentInterests: string[],
    onChange: (val: string[]) => void
  ) {
    const updated = currentInterests.filter((_, i) => i !== index);
    onChange(updated);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await CreateTrip(values);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao gerar a viagem");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destino</FormLabel>
              <FormControl>
                <Input
                  placeholder="Para onde você quer ir?"
                  {...field}
                  className="w-full h-14"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Partida</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-14 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Partida</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col  w-full">
                <FormLabel>Volta</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-14  text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Volta</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Orçamento</FormLabel>
              <FormControl>
                <NumericFormat
                  value={
                    field.value !== undefined && field.value !== null
                      ? (field.value / 100).toString()
                      : ""
                  }
                  onValueChange={(val) => {
                    const newValue = (val.floatValue ?? 0) * 100;
                    if (newValue !== field.value) {
                      field.onChange(newValue);
                    }
                  }}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  allowNegative={false}
                  allowLeadingZeros={false}
                  thousandSeparator="."
                  customInput={Input}
                  prefix="R$"
                  className="w-full h-14"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interesses</FormLabel>

              <FormControl>
                <Input
                  placeholder="Digite e pressione Enter"
                  className="w-full h-14"
                  onKeyDown={(e) =>
                    handleAddInterest(
                      e,
                      e.currentTarget.value,
                      field.value,
                      field.onChange
                    )
                  }
                />
              </FormControl>

              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveInterest(index, field.value, field.onChange)
                      }
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          size={"lg"}
          type="submit"
          className="w-full bg-[#12A3ED] cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            "Gerar Viagem"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateTripFormComponent;
