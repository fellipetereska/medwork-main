using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SelectSort
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            int[] vet = new int[5];
            int i,aux,x,menor;

            vet[0] = 6;
            vet[1] = 3;
            vet[2] = 1;
            vet[3] = 2;
            vet[4] = 5;

            lbxOriginal.Items.Clear();

            for (int a = 0; a < vet.Length; a++)
            {
                lbxOriginal.Items.Add(vet[a].ToString());
            }

            lbxOrdenado.Items.Clear();

            for (i = 0; i < vet.Length; i++)
            {
                menor = i;

                for (x = i + 1; x <
                    vet.Length; x++)
                {
                    if (vet[x] < vet[menor])
                    {
                        menor = x;
                    }
                }

                aux = vet[menor];
                vet[menor] = vet[i];
                vet[i] = aux;
            }

            for (int y = 0; y < vet.Length; y++)
            {
                lbxOrdenado.Items.Add(vet[y].ToString());
            }
        }
    }
}
