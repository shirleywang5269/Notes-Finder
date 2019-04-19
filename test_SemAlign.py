from SemAlign import SemAlign
import numpy as np

# Paths
text_path = 'notes/9_150750.txt'
embeddings_path = 'glove.6B.50d.csv'

# Parameters
search_str = 'Recent loss or other significant negative event'
kernel_size = len(search_str) # Fuzzy radius for inter-word dependencies
w = (0.25,0.25) # Higher weights penalized gaps for (text1, text2)
k = 10 # Return top k results

################################################################################

# if __name__ == '__main__':

    # Load text file
with open(text_path, 'r') as f: text_str = f.read().replace('\n', '')

    # Initiate aligner
aligner = SemAlign(embeddings_path, kernel_size, delimiter=' ')

    # Search for alignments

print("Searching for:", search_str)
alignments, scores = aligner.align(text_str, search_str, k, w)
#np.savetxt('test.out', (alignments, scores),fmt='%s,%s') 