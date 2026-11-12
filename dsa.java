
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }

        int k = 1;
        for (int j = 1; j < nums.length; j++) {
            if (nums[j] != nums[j - 1]) {
                nums[k] = nums[j];
                k++;
            }
        }
        return k;
    }

    // Input: all whitespace-separated integers are the array.
    // Example: 0 0 0 1 1 2 2 3 3 4 4 5 5
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> values = new ArrayList<>();

        while (scanner.hasNextInt()) {
            values.add(scanner.nextInt());
        }

        int[] nums = values.stream().mapToInt(Integer::intValue).toArray();
        int k = new Solution().removeDuplicates(nums);

        System.out.println("k = " + k);
        System.out.print("unique values: ");
        for (int i = 0; i < k; i++) {
            if (i > 0) System.out.print(" ");
            System.out.print(nums[i]);
        }
        System.out.println();
    }
}
