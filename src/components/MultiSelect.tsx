import CreatableSelect from "react-select/creatable";
import { useGetDancersQuery } from "@/store/slices/admin/dancers";

export default function MultiSelect({
  onChange,
  defaultDancerNames,
}: {
  onChange: (newValue: { value: string; label: string }[]) => void;
  defaultDancerNames: string[];
}) {
  const { data: dancers } = useGetDancersQuery()

  const handleChange = (
    newValue: readonly { value: string; label: string }[]
    // _actionMeta: any
  ) => {
    onChange([...newValue]);
  };

  return (
    <div>
      <label htmlFor="dancers" className="block font-medium">
        Dancers
      </label>
      <CreatableSelect
        defaultValue={defaultDancerNames.map((name) => ({
          value: name,
          label: name,
        }))}
        isMulti
        name="dancers"
        options={dancers?.map((dancer) => ({ value: dancer, label: dancer }))}
        className="basic-multi-select"
        classNamePrefix="select"
        menuPortalTarget={typeof window !== "undefined" ? document.body : null}
        menuPosition="fixed" // avoid clipping/scroll parents
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 1500 }), // > MUI's Popover(1200)/Modal(1300)
        }}
        onChange={handleChange}
      />
    </div>
  );
}
