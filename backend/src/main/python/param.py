import petya
LIMIT = 120 # ресурс
GEN_NUM = 5 # сколько графов генерить
NUM_VERTICES = 16 # сколько вершин генерить
MAGIC = 0.8 # влияет на число ребер в графах, ~(0, 1)
#RANDOM_V_MIN = 10 # рандом весов
#RANDOM_V_MAX = 20 # рандом весов
#RANDOM_E_MIN = 20 # рандом весов
#RANDOM_E_MAX = 40 # рандом весов
MU_V = 20    # для Гаусса
SIGMA_V = 5  # для Гаусса
MU_E = 20    # для Гаусса
SIGMA_E = 5  # для Гаусса

MET = 'pcst' #'brute' or 'pcst'

TEST_ALG_1 = petya.optgraph_spath_greedy
TEST_ALG_2 = petya.optgraph_simple_greedy
TEST_ALG_3 = petya.optgraph_spath_grasp
TEST_ALG_4 = petya.optgraph_simple_grasp