import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { tw } from "src/theme";

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetModalProps>(
  ({ children, ...props }, ref) => {
    return (
      <BottomSheetModal
        ref={ref}
        {...props}
        backgroundStyle={tw`bg-base-200`}
        handleIndicatorStyle={tw`bg-base-content`}
      >
        {children}
      </BottomSheetModal>
    );
  }
);
